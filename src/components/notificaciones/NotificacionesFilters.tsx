import { format } from 'date-fns';

interface NotificacionesFiltersProps {
  filters: {
    fechaEmisionInicio: string;
    fechaEmisionFin: string;
    fechaRecepcion: string;
    fechaRespuesta: string;
    nombreReceptor: string;
  };
  onChange: (filters: any) => void;
  onSearch: () => void;
}

function NotificacionesFilters({ filters, onChange, onSearch }: NotificacionesFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Desde
          </label>
          <input
            type="date"
            value={filters.fechaEmisionInicio}
            onChange={(e) =>
              onChange({ ...filters, fechaEmisionInicio: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hasta
          </label>
          <input
            type="date"
            value={filters.fechaEmisionFin}
            onChange={(e) =>
              onChange({ ...filters, fechaEmisionFin: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha Recepción
          </label>
          <input
            type="date"
            value={filters.fechaRecepcion}
            onChange={(e) =>
              onChange({ ...filters, fechaRecepcion: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha Respuesta
          </label>
          <input
            type="date"
            value={filters.fechaRespuesta}
            onChange={(e) =>
              onChange({ ...filters, fechaRespuesta: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre del Receptor
          </label>
          <input
            type="text"
            value={filters.nombreReceptor}
            onChange={(e) =>
              onChange({ ...filters, nombreReceptor: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Buscar por nombre..."
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSearch}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
}

export default NotificacionesFilters;