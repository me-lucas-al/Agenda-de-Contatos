import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export const Header = () => {
  const { email, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary-600">
          Agenda de Contatos
        </Link>
        
        <nav className="flex items-center space-x-6">
          {email ? (
            <>
              <Link href="/contacts" className="text-gray-600 hover:text-primary-600">
                Meus Contatos
              </Link>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-primary-600"
              >
                Sair
              </button>
              <span className="text-sm text-gray-500">{email}</span>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-primary-600">
                Entrar
              </Link>
              <Link href="/register" className="text-gray-600 hover:text-primary-600">
                Cadastrar
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};