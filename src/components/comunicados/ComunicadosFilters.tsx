interface ComunicadosFiltersProps {
  filters: {
    fechaEmisionInicio: string;
    fechaEmisionFin: string;
    tipoReceptor: string;
    estado: string;
  };
  onChange: (filters: any) => void;
  onSearch: () => void;
}

function ComunicadosFilters({ filters, onChange, onSearch }: ComunicadosFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            Tipo Receptor
          </label>
          <select
            value={filters.tipoReceptor}
            onChange={(e) =>
              onChange({ ...filters, tipoReceptor: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Todos</option>
            <option value="1">Individual</option>
            <option value="2">Grupo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            value={filters.estado}
            onChange={(e) =>
              onChange({ ...filters, estado: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Todos</option>
            <option value="1">Borrador</option>
            <option value="2">Confirmado</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSearch}
          disabled={!filters.fechaEmisionInicio || !filters.fechaEmisionFin}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
}

export default ComunicadosFilters;