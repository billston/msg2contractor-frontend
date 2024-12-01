import { AtSign } from 'lucide-react';

interface SelectedItemProps {
  label: string;
  description?: string;
  onRemove?: () => void;
  readOnly?: boolean;
}

function SelectedItem({ label, description, onRemove, readOnly }: SelectedItemProps) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-sm">
      <AtSign className="h-3.5 w-3.5 text-indigo-500" />
      <span>{label}</span>
      {description && (
        <span className="text-xs text-indigo-500">({description})</span>
      )}
      {!readOnly && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 p-0.5 hover:bg-indigo-100 rounded-full"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SelectedItem;