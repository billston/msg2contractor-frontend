import { ChangeEvent, useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  accept?: string;
  onChange: (file: File) => void;
  label: string;
  error?: string;
}

function FileUpload({ accept = 'image/jpeg', onChange, label, error }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      // Reset el input para permitir seleccionar el mismo archivo nuevamente
      e.target.value = '';
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md
          ${error ? 'text-red-700 bg-red-50 hover:bg-red-100' : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'}`}
      >
        <Upload className="mr-2 h-4 w-4" />
        Seleccionar archivo
      </button>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleChange}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default FileUpload;