import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { api } from '../config/api';
import { ITEMS_PER_PAGE } from '../config/pagination';
import { Receptor } from '../types';
import { useReceptores } from '../hooks/useReceptores';
import CreateReceptorModal from '../components/receptores/CreateReceptorModal';
import EditReceptorModal from '../components/receptores/EditReceptorModal';
import ReceptoresTable from '../components/receptores/ReceptoresTable';
import Pagination from '../components/Pagination';
import SearchInput from '../components/SearchInput';
import toast from 'react-hot-toast';

function ReceptoresPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingReceptor, setEditingReceptor] = useState<Receptor | null>(null);

  const { data: receptores, isLoading } = useQuery({
    queryKey: ['receptores', activeSearch],
    queryFn: async () => {
      const response = await api.get<Receptor[]>('/receptores', {
        params: { search: activeSearch },
      });
      return response.data;
    },
  });

  const { deleteReceptor } = useReceptores();

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este receptor?')) {
      try {
        await deleteReceptor.mutateAsync(id);
      } catch (error) {
        if (error.response?.status === 409) {
          toast.error('No se puede eliminar el receptor porque tiene notificaciones asociadas');
        }
      }
    }
  };

  const handleSearch = () => {
    setActiveSearch(searchTerm.trim());
    setCurrentPage(1);
  };

  // Pagination logic
  const filteredReceptores = receptores || [];
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedReceptores = filteredReceptores.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Receptores</h1>
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Receptor
        </button>
      </div>

      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        onSearch={handleSearch}
        placeholder="Buscar por código o nombre..."
      />

      <ReceptoresTable
        receptores={paginatedReceptores}
        isLoading={isLoading}
        onEdit={setEditingReceptor}
        onDelete={handleDelete}
      />

      {!isLoading && filteredReceptores.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={filteredReceptores.length}
          onPageChange={setCurrentPage}
        />
      )}

      <CreateReceptorModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <EditReceptorModal
        receptor={editingReceptor}
        onClose={() => setEditingReceptor(null)}
      />
    </div>
  );
}

export default ReceptoresPage;