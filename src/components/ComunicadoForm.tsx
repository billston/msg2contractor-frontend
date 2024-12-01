import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FileUpload from './FileUpload';
import AutocompleteInput from './AutocompleteInput';
import { useQuery } from '@tanstack/react-query';
import { api } from '../config/api';
import { Receptor, GrupoReceptor } from '../types';
import Quill from 'quill';
import SelectedItem from './SelectedItem';
import FilePreview from './FilePreview';

const comunicadoSchema = z.object({
  tipoReceptor: z.number(),
  idGrupoReceptor: z.number().optional(),
  destinatario: z.string().optional(),
  asunto: z.string().min(1, 'El asunto es requerido'),
  contenido: z.string().min(1, 'El contenido es requerido'),
  fechaVencimiento: z.string().optional(),
  confirmacionRecepcion: z.boolean(),
  solicitarRespuesta: z.boolean(),
});

type ComunicadoFormData = z.infer<typeof comunicadoSchema>;

interface ComunicadoFormProps {
  onSubmit: (data: ComunicadoFormData, adjunto?: File) => void;
  initialData?: Partial<ComunicadoFormData>;
  isSubmitting?: boolean;
  readOnly?: boolean;
}

// Registrar fuentes adicionales en Quill
const Font = Quill.import('formats/font');
Font.whitelist = ['arial', 'times-new-roman', 'courier-new', 'roboto', 'verdana'];
Quill.register(Font, true);

const modules = {
  toolbar: [
    [{ font: Font.whitelist }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ header: [1, 2, 3, 4, false] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

function ComunicadoForm({
  onSubmit,
  initialData,
  isSubmitting,
  readOnly,
}: ComunicadoFormProps) {
  const [adjunto, setAdjunto] = useState<File>();
  const [selectedReceptores, setSelectedReceptores] = useState<Receptor[]>([]);
  const [selectedGrupo, setSelectedGrupo] = useState<GrupoReceptor | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ComunicadoFormData>({
    resolver: zodResolver(comunicadoSchema),
    defaultValues: {
      tipoReceptor: 0,
      confirmacionRecepcion: false,
      solicitarRespuesta: false,
      ...initialData,
    },
  });

  const tipoReceptor = watch('tipoReceptor');

  const { data: receptores } = useQuery({
    queryKey: ['receptores'],
    queryFn: async () => {
      const response = await api.get<Receptor[]>('/receptores');
      return response.data;
    },
    enabled: tipoReceptor === 1,
  });

  const { data: grupos } = useQuery({
    queryKey: ['grupos'],
    queryFn: async () => {
      const response = await api.get<GrupoReceptor[]>('/grupos', {
        params: { search: '' },
      });
      return response.data;
    },
    enabled: tipoReceptor === 2,
  });

  // Cargar receptores seleccionados inicialmente
  useEffect(() => {
    if (initialData?.destinatario && receptores) {
      const ids = initialData.destinatario.split(';').map(Number);
      const selected = receptores.filter(r => ids.includes(r.idReceptor));
      setSelectedReceptores(selected);
    }
  }, [initialData?.destinatario, receptores]);

  // Cargar grupo seleccionado inicialmente
  useEffect(() => {
    if (initialData?.idGrupoReceptor && grupos) {
      const grupo = grupos.find(g => g.idGrupoReceptor === initialData.idGrupoReceptor);
      if (grupo) setSelectedGrupo(grupo);
    }
  }, [initialData?.idGrupoReceptor, grupos]);

  const handleReceptorSelect = (receptor: Receptor) => {
    const currentIds = selectedReceptores.map(r => r.idReceptor);
    if (!currentIds.includes(receptor.idReceptor)) {
      const newReceptores = [...selectedReceptores, receptor];
      setSelectedReceptores(newReceptores);
      setValue(
        'destinatario',
        newReceptores.map(r => r.idReceptor).join(';')
      );
    }
  };

  const handleRemoveReceptor = (receptor: Receptor) => {
    const newReceptores = selectedReceptores.filter(
      r => r.idReceptor !== receptor.idReceptor
    );
    setSelectedReceptores(newReceptores);
    setValue(
      'destinatario',
      newReceptores.map(r => r.idReceptor).join(';')
    );
  };

  const handleGrupoSelect = (grupo: GrupoReceptor) => {
    setSelectedGrupo(grupo);
    setValue('idGrupoReceptor', grupo.idGrupoReceptor);
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, adjunto))} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo de Receptor
          </label>
          <select
            {...register('tipoReceptor', { valueAsNumber: true })}
            disabled={readOnly}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value={0}>Seleccione un tipo</option>
            <option value={1}>Individual</option>
            <option value={2}>Grupo</option>
          </select>
        </div>

        {tipoReceptor === 1 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Seleccionar Receptores
            </label>
            <AutocompleteInput
              options={
                receptores?.map((receptor) => ({
                  id: receptor.idReceptor,
                  label: receptor.nombreCompleto,
                  description: `${receptor.codigo} - ${receptor.correoElectronico}`,
                })) || []
              }
              onSelect={(option) => {
                const receptor = receptores?.find(
                  (r) => r.idReceptor === option.id
                );
                if (receptor) handleReceptorSelect(receptor);
              }}
              placeholder="Buscar receptor..."
              disabled={readOnly}
            />
            {selectedReceptores.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedReceptores.map((receptor) => (
                  <SelectedItem
                    key={receptor.idReceptor}
                    label={receptor.nombreCompleto}
                    description={receptor.codigo}
                    onRemove={() => handleRemoveReceptor(receptor)}
                    readOnly={readOnly}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {tipoReceptor === 2 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Seleccionar Grupo
            </label>
            <AutocompleteInput
              options={
                grupos?.map((grupo) => ({
                  id: grupo.idGrupoReceptor,
                  label: grupo.nombre,
                })) || []
              }
              onSelect={(option) => {
                const grupo = grupos?.find(
                  (g) => g.idGrupoReceptor === option.id
                );
                if (grupo) handleGrupoSelect(grupo);
              }}
              placeholder="Buscar grupo..."
              disabled={readOnly}
            />
            {selectedGrupo && (
              <div className="mt-2">
                <SelectedItem
                  label={selectedGrupo.nombre}
                  onRemove={() => {
                    setSelectedGrupo(null);
                    setValue('idGrupoReceptor', undefined);
                  }}
                  readOnly={readOnly}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="asunto" className="block text-sm font-medium text-gray-700">
          Asunto
        </label>
        <input
          type="text"
          id="asunto"
          {...register('asunto')}
          disabled={readOnly}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.asunto && (
          <p className="mt-1 text-sm text-red-600">{errors.asunto.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Contenido</label>
        <Controller
          name="contenido"
          control={control}
          render={({ field }) => (
            <ReactQuill
              theme="snow"
              value={field.value}
              onChange={field.onChange}
              modules={modules}
              readOnly={readOnly}
              className="bg-white"
            />
          )}
        />
        {errors.contenido && (
          <p className="mt-1 text-sm text-red-600">{errors.contenido.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="fechaVencimiento" className="block text-sm font-medium text-gray-700">
          Fecha de Vencimiento
        </label>
        <input
          type="date"
          id="fechaVencimiento"
          {...register('fechaVencimiento')}
          disabled={readOnly}
          min={format(new Date(), "yyyy-MM-dd")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="confirmacionRecepcion"
            {...register('confirmacionRecepcion')}
            disabled={readOnly}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor="confirmacionRecepcion"
            className="ml-2 block text-sm text-gray-900"
          >
            Requiere confirmación de recepción
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="solicitarRespuesta"
            {...register('solicitarRespuesta')}
            disabled={readOnly}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor="solicitarRespuesta"
            className="ml-2 block text-sm text-gray-900"
          >
            Solicitar respuesta
          </label>
        </div>
      </div>

      {!readOnly && (
        <FileUpload
          label="Adjunto (PDF o Excel)"
          accept=".pdf,.xlsx,.xls"
          onChange={setAdjunto}
        />
      )}

      {(adjunto || initialData?.adjunto) && (
        <FilePreview
          file={adjunto || new File([], initialData?.adjunto || '')}
          onRemove={!readOnly ? () => setAdjunto(undefined) : undefined}
          readOnly={readOnly}
        />
      )}

      {!readOnly && (
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
          >
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      )}
    </form>
  );
}

export default ComunicadoForm;