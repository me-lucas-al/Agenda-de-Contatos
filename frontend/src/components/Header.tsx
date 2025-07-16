'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export const Header = () => {
  const { email, name, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900/95 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
            <span className="text-xl font-bold gradient-text">
              Agenda de Contatos
            </span>
          
          <nav className="hidden md:flex items-center space-x-6">
            {email ? (
              <>
               <Link 
                  href="/home" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  Home
                </Link>
                <Link 
                  href="/contacts" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  Meus Contatos
                </Link>
                
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors duration-200"
                  >
                    <span className="text-gray-300 font-medium">
                      Olá, {name ? name.split(' ')[0] : email?.split('@')[0]}
                    </span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm text-gray-300">Logado como</p>
                        <p className="text-sm font-medium text-white truncate">{email}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      >
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link 
                  href="/" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  Entrar
                </Link>
                <Link 
                  href="/register" 
                  className="btn-primary"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            {email ? (
              <>
                <Link 
                  href="/contacts" 
                  className="block py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Meus Contatos
                </Link>
                <div className="py-2 border-t border-gray-700 mt-2">
                  <p className="text-sm text-gray-400">Logado como</p>
                  <p className="text-sm font-medium text-white">{email}</p>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="mt-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    Sair
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  href="/" 
                  className="block py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Entrar
                </Link>
                <Link 
                  href="/register" 
                  className="block py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};