import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { api } from '../config/api';
import { ITEMS_PER_PAGE } from '../config/pagination';
import { Comunicado } from '../types';
import { useComunicados } from '../hooks/useComunicados';
import CreateComunicadoModal from '../components/comunicados/CreateComunicadoModal';
import EditComunicadoModal from '../components/comunicados/EditComunicadoModal';
import ViewComunicadoModal from '../components/comunicados/ViewComunicadoModal';
import ComunicadosTable from '../components/comunicados/ComunicadosTable';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';

function ComunicadosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingComunicado, setEditingComunicado] = useState<Comunicado | null>(null);
  const [viewingComunicado, setViewingComunicado] = useState<Comunicado | null>(null);

  const { data: comunicados, isLoading } = useQuery({
    queryKey: ['comunicados', activeSearch],
    queryFn: async () => {
      const response = await api.get<Comunicado[]>('/comunicados', {
        params: { asunto: activeSearch },
      });
      return response.data;
    },
  });

  const { confirmarComunicado } = useComunicados();

  const handleConfirmar = async (id: number) => {
    if (window.confirm('¿Está seguro de confirmar este comunicado?')) {
      await confirmarComunicado.mutateAsync(id);
    }
  };

  const handleSearch = () => {
    setActiveSearch(searchTerm.trim());
    setCurrentPage(1);
  };

  // Pagination logic
  const filteredComunicados = comunicados || [];
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedComunicados = filteredComunicados.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Comunicados</h1>
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Comunicado
        </button>
      </div>

      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        onSearch={handleSearch}
        placeholder="Buscar por asunto..."
      />

      <ComunicadosTable
        comunicados={paginatedComunicados}
        isLoading={isLoading}
        onView={setViewingComunicado}
        onEdit={setEditingComunicado}
        onConfirm={handleConfirmar}
      />

      {!isLoading && filteredComunicados.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={filteredComunicados.length}
          onPageChange={setCurrentPage}
        />
      )}

      <CreateComunicadoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <EditComunicadoModal
        comunicado={editingComunicado}
        onClose={() => setEditingComunicado(null)}
      />

      <ViewComunicadoModal
        comunicado={viewingComunicado}
        onClose={() => setViewingComunicado(null)}
      />
    </div>
  );
}

export default ComunicadosPage;