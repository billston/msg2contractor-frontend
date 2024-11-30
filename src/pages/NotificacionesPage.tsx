import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Switch } from '@headlessui/react';
import { api } from '../config/api';
import { ITEMS_PER_PAGE } from '../config/pagination';
import { Notificacion } from '../types';
import { useNotificaciones } from '../hooks/useNotificaciones';
import NotificacionesTable from '../components/notificaciones/NotificacionesTable';
import NotificacionesFilters from '../components/notificaciones/NotificacionesFilters';
import ViewNotificacionModal from '../components/notificaciones/ViewNotificacionModal';
import RespuestaModal from '../components/notificaciones/RespuestaModal';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';

function NotificacionesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotificacion, setSelectedNotificacion] = useState<Notificacion | null>(null);
  const [isRespuestaModalOpen, setIsRespuestaModalOpen] = useState(false);
  const [useAdvancedFilters, setUseAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    fechaEmisionInicio: '',
    fechaEmisionFin: '',
    fechaRecepcion: '',
    fechaRespuesta: '',
    nombreReceptor: '',
  });

  const { data: notificaciones, isLoading } = useQuery({
    queryKey: ['notificaciones', activeSearch, useAdvancedFilters ? filters : null],
    queryFn: async () => {
      const response = await api.get<Notificacion[]>('/notificaciones', {
        params: useAdvancedFilters ? filters : { asuntoComunicado: activeSearch },
      });
      return response.data;
    },
  });

  const { confirmarRecepcion } = useNotificaciones();

  const handleConfirmarRecepcion = async (id: number) => {
    if (window.confirm('¿Está seguro de confirmar la recepción?')) {
      await confirmarRecepcion.mutateAsync(id);
    }
  };

  const handleSearch = () => {
    if (useAdvancedFilters) {
      setActiveSearch('');
    } else {
      setActiveSearch(searchTerm.trim());
    }
    setCurrentPage(1);
  };

  // Pagination logic
  const filteredNotificaciones = notificaciones || [];
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNotificaciones = filteredNotificaciones.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Notificaciones</h1>
        <Switch.Group>
          <div className="flex items-center">
            <Switch.Label className="mr-3 text-sm text-gray-700">
              Filtros avanzados
            </Switch.Label>
            <Switch
              checked={useAdvancedFilters}
              onChange={(checked) => {
                setUseAdvancedFilters(checked);
                setActiveSearch('');
                setSearchTerm('');
                setFilters({
                  fechaEmisionInicio: '',
                  fechaEmisionFin: '',
                  fechaRecepcion: '',
                  fechaRespuesta: '',
                  nombreReceptor: '',
                });
              }}
              className={`${
                useAdvancedFilters ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  useAdvancedFilters ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </Switch.Group>
      </div>

      {useAdvancedFilters ? (
        <NotificacionesFilters
          filters={filters}
          onChange={setFilters}
          onSearch={handleSearch}
        />
      ) : (
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
          placeholder="Buscar por asunto..."
        />
      )}

      <NotificacionesTable
        notificaciones={paginatedNotificaciones}
        isLoading={isLoading}
        onView={setSelectedNotificacion}
        onConfirm={handleConfirmarRecepcion}
        onResponder={(notificacion) => {
          setSelectedNotificacion(notificacion);
          setIsRespuestaModalOpen(true);
        }}
      />

      {!isLoading && filteredNotificaciones.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={filteredNotificaciones.length}
          onPageChange={setCurrentPage}
        />
      )}

      <ViewNotificacionModal
        notificacion={selectedNotificacion}
        onClose={() => setSelectedNotificacion(null)}
      />

      <RespuestaModal
        notificacion={selectedNotificacion}
        isOpen={isRespuestaModalOpen}
        onClose={() => {
          setIsRespuestaModalOpen(false);
          setSelectedNotificacion(null);
        }}
      />
    </div>
  );
}

export default NotificacionesPage;