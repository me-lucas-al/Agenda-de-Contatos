'use client';

import { Header } from '../../components/Header';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useContacts } from '../../hooks/useContacts';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const { email, name, isLoading } = useAuth();
  const { contacts, loading: contactsLoading} = useContacts();
  const [stats, setStats] = useState({
    totalContacts: 0,
    recentContacts: 0,
    contactsThisWeek: 0
  });

  const getFirstName = (fullName: string | null) => {
    if (!fullName) return null;
    return fullName.split(' ')[0]; 
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  useEffect(() => {
    if (!isLoading && !email) {
      router.push('/');
    }
  }, [isLoading, email, router]);

  useEffect(() => {
    if (contacts.length > 0) {
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      setStats({
        totalContacts: contacts.length,
        recentContacts: contacts.slice(-5).length,
        contactsThisWeek: contacts.filter(contact => {
          return true;
        }).length
      });
    }
  }, [contacts]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-4 text-gray-400">Verificando autenticação...</span>
          </div>
        </main>
      </div>
    );
  }

  if (!email) {
    return null;
  }

  const recentContacts = contacts.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">
                {getGreeting()}, {getFirstName(name) || email.split('@')[0]}!
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Gerencie seus contatos de forma simples e eficiente
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6 hover-glow transition-all duration-300 animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total de Contatos</p>
                <p className="text-3xl font-bold gradient-text">{stats.totalContacts}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card p-6 hover-glow transition-all duration-300 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Contatos Recentes</p>
                <p className="text-3xl font-bold gradient-text">{stats.recentContacts}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card p-6 hover-glow transition-all duration-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Esta Semana</p>
                <p className="text-3xl font-bold gradient-text">{stats.contactsThisWeek}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-6 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <h3 className="text-xl font-bold mb-6 gradient-text">Ações Rápidas</h3>
            <div className="space-y-4">
              <button
                onClick={() => router.push('/contacts')}
                className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Ver Todos os Contatos</span>
              </button>
              
              <button
                onClick={() => router.push('/contacts?action=add')}
                className="w-full btn-secondary flex items-center justify-center space-x-2 py-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Adicionar Novo Contato</span>
              </button>
            </div>
          </div>

          <div className="card p-6 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold gradient-text">Contatos Recentes</h3>
              {contacts.length > 5 && (
                <button
                  onClick={() => router.push('/contacts')}
                  className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  Ver todos
                </button>
              )}
            </div>
            
            {contactsLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-700 rounded w-3/4 mb-1"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentContacts.length > 0 ? (
              <div className="space-y-3">
                {recentContacts.map((contact, index) => (
                  <div key={contact.id} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{contact.name}</p>
                      <p className="text-gray-400 text-sm truncate">{contact.email}</p>
                    </div>
                    <div className="text-gray-400 text-xs">
                      {contact.phone}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-gray-400 mb-4">Nenhum contato encontrado</p>
                <button
                  onClick={() => router.push('/contacts?action=add')}
                  className="btn-primary"
                >
                  Adicionar Primeiro Contato
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}