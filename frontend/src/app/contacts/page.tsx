'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '../../components/Header';
import { ContactForm } from '../../components/ContactForm';
import { ContactList } from '../../components/ContactList';
import { useAuth } from '../../contexts/AuthContext';
import { useContacts } from '../../hooks/useContacts';
import { ContactCreate } from '../../types/contacts';

// Componente separado para usar useSearchParams
function ContactsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { email, isLoading } = useAuth();
  const { contacts, loading, error, createContact, updateContact, deleteContact } = useContacts();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isLoading && !email) {
      router.push('/');
      return;
    }
    
    if (searchParams.get('action') === 'add') {
      setShowAddForm(true);
    }
  }, [isLoading, email, router, searchParams]);

  const handleCreateContact = async (data: ContactCreate) => {
    try {
      await createContact(data);
      setShowAddForm(false);
    } catch (error) {
      console.error('Erro ao criar contato:', error);
    }
  };

  const handleUpdateContact = async (id: string, contactData: any) => {
    try {
      await updateContact(id, contactData);
    } catch (error) {
      console.error('Erro ao atualizar contato:', error);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este contato?')) {
      try {
        await deleteContact(id);
      } catch (error) {
        console.error('Erro ao deletar contato:', error);
      }
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-4 text-gray-400">Carregando...</span>
          </div>
        </main>
      </div>
    );
  }

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-800 border border-red-600 text-red-200 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Meus Contatos
              </h1>
              <p className="text-gray-400">
                Gerencie seus contatos de forma simples e organizada
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Adicionar Contato
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Pesquisar contatos por nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg leading-5 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>
        </div>

        {showAddForm && (
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Adicionar Novo Contato</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ContactForm
              onSubmit={handleCreateContact}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total de Contatos</p>
                <p className="text-2xl font-bold text-white">{contacts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Contatos Filtrados</p>
                <p className="text-2xl font-bold text-white">{filteredContacts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Pesquisando por</p>
                <p className="text-lg font-semibold text-white truncate">
                  {searchTerm || 'Todos os contatos'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <span className="ml-4 text-gray-400">Carregando contatos...</span>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-white">
                {searchTerm ? 'Nenhum contato encontrado' : 'Nenhum contato cadastrado'}
              </h3>
              <p className="mt-1 text-gray-400">
                {searchTerm 
                  ? 'Tente pesquisar com outros termos' 
                  : 'Comece adicionando seu primeiro contato'
                }
              </p>
              {!searchTerm && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Adicionar Contato
                  </button>
                </div>
              )}
            </div>
          ) : (
            <ContactList
              contacts={filteredContacts}
              onUpdate={handleUpdateContact}
              onDelete={handleDeleteContact}
              userEmail={email}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// Componente de loading para o Suspense
function ContactsLoading() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-gray-400">Carregando...</span>
        </div>
      </main>
    </div>
  );
}

// Componente principal com Suspense
export default function ContactsPage() {
  return (
    <Suspense fallback={<ContactsLoading />}>
      <ContactsContent />
    </Suspense>
  );
}