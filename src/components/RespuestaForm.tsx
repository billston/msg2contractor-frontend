import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FileUpload from './FileUpload';

const respuestaSchema = z.object({
  respuesta: z.string().min(1, 'La respuesta es requerida'),
});

type RespuestaFormData = z.infer<typeof respuestaSchema>;

interface RespuestaFormProps {
  onSubmit: (data: RespuestaFormData, adjunto?: File) => void;
  isSubmitting?: boolean;
}

const modules = {
  toolbar: [
    [{ font: [] }], // Fuente
    [{ size: ['small', false, 'large', 'huge'] }], // Tamaño de fuente
    ['bold', 'italic', 'underline', 'strike'], // Estilos de texto
    [{ color: [] }, { background: [] }], // Colores
    [{ script: 'sub' }, { script: 'super' }], // Subíndice y superíndice
    [{ header: 1 }, { header: 2 }, { header: 3 }, { header: 4 }], // Encabezados
    [{ list: 'ordered' }, { list: 'bullet' }], // Listas
    [{ indent: '-1' }, { indent: '+1' }], // Sangría
    [{ align: [] }], // Alineación de texto
    ['link', 'image', 'video'], // Enlaces, imágenes y videos
    ['blockquote', 'code-block'], // Bloque de cita y bloque de código
    ['clean'], // Botón para limpiar formatos
  ]
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'align',
  'list', 'bullet'
];

function RespuestaForm({ onSubmit, isSubmitting }: RespuestaFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RespuestaFormData>({
    resolver: zodResolver(respuestaSchema),
    defaultValues: {
      respuesta: '',
    },
  });

  const [adjunto, setAdjunto] = useState<File>();

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, adjunto))} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Respuesta</label>
        <Controller
          name="respuesta"
          control={control}
          render={({ field }) => (
            <ReactQuill
              theme="snow"
              value={field.value}
              onChange={field.onChange}
              modules={modules}
              formats={formats}
              className="bg-white"
            />
          )}
        />
        {errors.respuesta && (
          <p className="mt-1 text-sm text-red-600">{errors.respuesta.message}</p>
        )}
      </div>

      <FileUpload
        label="Adjunto (PDF o Excel)"
        accept=".pdf,.xlsx,.xls"
        onChange={setAdjunto}
      />

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Respuesta'}
        </button>
      </div>
    </form>
  );
}

export default RespuestaForm;