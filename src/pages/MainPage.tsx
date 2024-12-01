import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function MainPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Bienvenido, {user?.name || 'Usuario'}
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Link
                  to="/receptores"
                  className="relative block rounded-lg border border-gray-300 bg-white p-6 shadow-sm hover:border-gray-400 hover:ring-1 hover:ring-gray-400"
                >
                  <h2 className="text-lg font-medium text-gray-900">Receptores</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Gestiona los receptores de comunicados
                  </p>
                </Link>

                <Link
                  to="/grupos"
                  className="relative block rounded-lg border border-gray-300 bg-white p-6 shadow-sm hover:border-gray-400 hover:ring-1 hover:ring-gray-400"
                >
                  <h2 className="text-lg font-medium text-gray-900">Grupos</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Administra grupos de receptores
                  </p>
                </Link>

                <Link
                  to="/comunicados"
                  className="relative block rounded-lg border border-gray-300 bg-white p-6 shadow-sm hover:border-gray-400 hover:ring-1 hover:ring-gray-400"
                >
                  <h2 className="text-lg font-medium text-gray-900">Comunicados</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Crea y gestiona comunicados
                  </p>
                </Link>

                <Link
                  to="/notificaciones"
                  className="relative block rounded-lg border border-gray-300 bg-white p-6 shadow-sm hover:border-gray-400 hover:ring-1 hover:ring-gray-400"
                >
                  <h2 className="text-lg font-medium text-gray-900">Notificaciones</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Revisa el estado de las notificaciones
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainPage;