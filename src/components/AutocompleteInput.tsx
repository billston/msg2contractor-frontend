import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface Option {
  id: number;
  label: string;
  description?: string;
}

interface AutocompleteInputProps {
  options: Option[];
  onSelect: (option: Option) => void;
  placeholder?: string;
  disabled?: boolean;
}

function AutocompleteInput({
  options,
  onSelect,
  placeholder = 'Buscar...',
  disabled = false,
}: AutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          disabled={disabled}
        />
      </div>

      {isOpen && !disabled && filteredOptions.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              className="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-gray-100"
              onClick={() => {
                onSelect(option);
                setSearchTerm('');
                setIsOpen(false);
              }}
            >
              <div className="flex flex-col">
                <span className="truncate font-medium">{option.label}</span>
                {option.description && (
                  <span className="truncate text-sm text-gray-500">
                    {option.description}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutocompleteInput;