import { FileText, FileSpreadsheet, X } from 'lucide-react';

interface FilePreviewProps {
  file: File;
  onRemove?: () => void;
  readOnly?: boolean;
}

function FilePreview({ file, onRemove, readOnly }: FilePreviewProps) {
  const getIcon = () => {
    if (file.type === 'application/pdf') {
      return <FileText className="h-4 w-4 text-red-500" />;
    }
    return <FileSpreadsheet className="h-4 w-4 text-green-500" />;
  };

  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 rounded-md text-sm">
      {getIcon()}
      <span className="text-gray-700">{file.name}</span>
      {!readOnly && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="p-0.5 hover:bg-gray-200 rounded-full ml-1"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export default FilePreview;