import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Modal from '../Modal';
import { api } from '../../config/api';
import { GrupoReceptor, Receptor } from '../../types';
import { useGrupos } from '../../hooks/useGrupos';
import ReceptorSelector from '../ReceptorSelector';

interface MiembrosModalProps {
  grupo: GrupoReceptor | null;
  onClose: () => void;
}

function MiembrosModal({ grupo, onClose }: MiembrosModalProps) {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  const { data: miembros, isLoading: isLoadingMiembros } = useQuery({
    queryKey: ['grupos', grupo?.idGrupoReceptor, 'miembros'],
    queryFn: async () => {
      if (!grupo) return [];
      const response = await api.get<Receptor[]>(`/grupos/${grupo.idGrupoReceptor}/miembros`);
      return response.data;
    },
    enabled: !!grupo,
  });

  const { addMiembro, removeMiembro } = useGrupos();

  const handleAddMember = async (receptor: Receptor) => {
    if (grupo) {
      await addMiembro.mutateAsync({
        grupoId: grupo.idGrupoReceptor,
        data: { idReceptor: receptor.idReceptor },
      });
      setIsAddMemberModalOpen(false);
    }
  };

  const handleRemoveMember = async (miembroId: number) => {
    if (grupo && window.confirm('¿Está seguro de eliminar este miembro del grupo?')) {
      await removeMiembro.mutateAsync({
        grupoId: grupo.idGrupoReceptor,
        miembroId,
      });
    }
  };

  if (!grupo) return null;

  return (
    <>
      <Modal
        isOpen={!!grupo}
        onClose={onClose}
        title={`Miembros de ${grupo.nombre}`}
      >
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setIsAddMemberModalOpen(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Miembro
          </button>

          <div className="mt-4">
            {isLoadingMiembros ? (
              <div className="text-center py-4">Cargando miembros...</div>
            ) : !miembros?.length ? (
              <div className="text-center py-4">No hay miembros en este grupo</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                      Código
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Nombre
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Correo
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {miembros.map((miembro) => (
                    <tr key={miembro.idReceptor}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {miembro.codigo}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {miembro.nombreCompleto}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {miembro.correoElectronico}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <button
                          onClick={() => handleRemoveMember(miembro.idReceptor)}
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar miembro"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        title="Agregar Miembro"
      >
        <ReceptorSelector
          onSelect={handleAddMember}
          excludeIds={miembros?.map((m) => m.idReceptor) || []}
        />
      </Modal>
    </>
  );
}

export default MiembrosModal;