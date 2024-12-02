import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { Mail, Users, UserPlus, Bell } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const navigation = [
    { name: 'Receptores', href: '/receptores', icon: UserPlus },
    { name: 'Grupos', href: '/grupos', icon: Users },
    { name: 'Comunicados', href: '/comunicados', icon: Mail },
    { name: 'Notificaciones', href: '/notificaciones', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Mail className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">Message2Contractor</span>
              </Link>
              {isAuthenticated && (
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                          location.pathname === item.href
                            ? 'border-b-2 border-indigo-500 text-gray-900'
                            : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              {isAuthenticated ? (
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <button
                  onClick={() => loginWithRedirect()}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Iniciar Sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

export default Layout;