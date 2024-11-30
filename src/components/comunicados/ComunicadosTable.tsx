import { Eye, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Comunicado } from '../../types';

interface ComunicadosTableProps {
  comunicados: Comunicado[];
  isLoading: boolean;
  onView: (comunicado: Comunicado) => void;
  onConfirm: (id: number) => void;
}

function ComunicadosTable({
  comunicados,
  isLoading,
  onView,
  onConfirm,
}: ComunicadosTableProps) {
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Asunto
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Tipo
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Fecha Emisión
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Estado
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      Cargando...
                    </td>
                  </tr>
                ) : comunicados.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No se encontraron comunicados
                    </td>
                  </tr>
                ) : (
                  comunicados.map((comunicado) => (
                    <tr key={comunicado.idComunicado}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {comunicado.asunto}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {comunicado.tipoReceptor === 1 ? 'Individual' : 'Grupo'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {comunicado.fechaEmision
                          ? format(new Date(comunicado.fechaEmision), 'dd/MM/yyyy HH:mm')
                          : '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {comunicado.idEstadoComunicado === 1 ? 'Borrador' : 'Confirmado'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm space-x-2">
                        <button
                          onClick={() => onView(comunicado)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {comunicado.idEstadoComunicado === 1 && (
                          <button
                            onClick={() => onConfirm(comunicado.idComunicado)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
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

export default ComunicadosTable;