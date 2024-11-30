import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Type,
  Palette,
} from 'lucide-react';

interface TailwindEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

function TailwindEditor({ value, onChange, disabled }: TailwindEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
    ],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080'];

  return (
    <div className="border rounded-lg overflow-hidden">
      {!disabled && (
        <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('bold') ? 'bg-gray-200' : ''
            }`}
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('italic') ? 'bg-gray-200' : ''
            }`}
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('underline') ? 'bg-gray-200' : ''
            }`}
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
            }`}
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
            }`}
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
            }`}
          >
            <AlignRight className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('bulletList') ? 'bg-gray-200' : ''
            }`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('orderedList') ? 'bg-gray-200' : ''
            }`}
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <div className="relative group">
            <button
              type="button"
              className="p-2 rounded hover:bg-gray-200 flex items-center gap-1"
            >
              <Type className="w-4 h-4" />
            </button>
            <div className="absolute hidden group-hover:block top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-2 z-10">
              {[1, 2, 3].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level }).run()
                  }
                  className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                    editor.isActive('heading', { level }) ? 'bg-gray-100' : ''
                  }`}
                >
                  Heading {level}
                </button>
              ))}
            </div>
          </div>

          <div className="relative group">
            <button
              type="button"
              className="p-2 rounded hover:bg-gray-200 flex items-center gap-1"
            >
              <Palette className="w-4 h-4" />
            </button>
            <div className="absolute hidden group-hover:block top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-2 z-10">
              <div className="grid grid-cols-3 gap-1">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() =>
                      editor.chain().focus().setColor(color).run()
                    }
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <EditorContent editor={editor} className="prose max-w-none p-4" />
    </div>
  );
}

export default TailwindEditor;