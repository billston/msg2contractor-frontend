import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { api } from '../config/api';
import { ITEMS_PER_PAGE } from '../config/pagination';
import { GrupoReceptor } from '../types';
import { useGrupos } from '../hooks/useGrupos';
import CreateGrupoModal from '../components/grupos/CreateGrupoModal';
import EditGrupoModal from '../components/grupos/EditGrupoModal';
import MiembrosModal from '../components/grupos/MiembrosModal';
import GruposTable from '../components/grupos/GruposTable';
import Pagination from '../components/Pagination';
import SearchInput from '../components/SearchInput';
import toast from 'react-hot-toast';

function GruposPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingGrupo, setEditingGrupo] = useState<GrupoReceptor | null>(null);
  const [selectedGrupo, setSelectedGrupo] = useState<GrupoReceptor | null>(null);

  const { data: grupos, isLoading } = useQuery({
    queryKey: ['grupos', activeSearch],
    queryFn: async () => {
      const response = await api.get<GrupoReceptor[]>('/grupos', {
        params: { search: activeSearch },
      });
      return response.data;
    },
  });

  const { deleteGrupo } = useGrupos();

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este grupo?')) {
      try {
        await deleteGrupo.mutateAsync(id);
      } catch (error) {
        // Error handling is done in the mutation
      }
    }
  };

  const handleSearch = () => {
    setActiveSearch(searchTerm.trim());
    setCurrentPage(1);
  };

  // Pagination logic
  const filteredGrupos = grupos || [];
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedGrupos = filteredGrupos.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Grupos</h1>
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Grupo
        </button>
      </div>

      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        onSearch={handleSearch}
        placeholder="Buscar por nombre..."
      />

      <GruposTable
        grupos={paginatedGrupos}
        isLoading={isLoading}
        onEdit={setEditingGrupo}
        onDelete={handleDelete}
        onViewMembers={setSelectedGrupo}
      />

      {!isLoading && filteredGrupos.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={filteredGrupos.length}
          onPageChange={setCurrentPage}
        />
      )}

      <CreateGrupoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <EditGrupoModal
        grupo={editingGrupo}
        onClose={() => setEditingGrupo(null)}
      />

      <MiembrosModal
        grupo={selectedGrupo}
        onClose={() => setSelectedGrupo(null)}
      />
    </div>
  );
}

export default GruposPage;