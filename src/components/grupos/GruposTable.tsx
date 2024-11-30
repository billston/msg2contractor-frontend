import { Pencil, Trash2, Users } from 'lucide-react';
import { GrupoReceptor } from '../../types';

interface GruposTableProps {
  grupos: GrupoReceptor[];
  isLoading: boolean;
  onEdit: (grupo: GrupoReceptor) => void;
  onDelete: (id: number) => void;
  onViewMembers: (grupo: GrupoReceptor) => void;
}

function GruposTable({
  grupos,
  isLoading,
  onEdit,
  onDelete,
  onViewMembers,
}: GruposTableProps) {
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Nombre
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {isLoading ? (
                  <tr>
                    <td colSpan={2} className="text-center py-4">
                      Cargando...
                    </td>
                  </tr>
                ) : grupos.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="text-center py-4">
                      No se encontraron grupos
                    </td>
                  </tr>
                ) : (
                  grupos.map((grupo) => (
                    <tr key={grupo.idGrupoReceptor}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {grupo.nombre}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm space-x-2">
                        <button
                          onClick={() => onViewMembers(grupo)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Ver miembros"
                        >
                          <Users className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onEdit(grupo)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Editar grupo"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(grupo.idGrupoReceptor)}
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar grupo"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GruposTable;