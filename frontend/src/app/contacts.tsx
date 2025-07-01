import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { useContacts } from '../hooks/useContacts';
import { Header } from '../components/Header';
import { ContactForm } from '../components/ContactForm';
import { ContactList } from '../components/ContactList';

export default function Contacts() {
  const router = useRouter();
  const { email, logout } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const { 
    contacts, 
    loading, 
    error, 
    createContact, 
    getContacts, 
    updateContact, 
    deleteContact 
  } = useContacts();

  useEffect(() => {
    if (!email) {
      router.push('/login');
      return;
    }

    getContacts();
  }, [email, router]);

  const handleCreateContact = async (data: any) => {
    await createContact(data);
    setShowForm(false);
    await getContacts();
  };

  const handleUpdateContact = async (id: string, data: any) => {
    await updateContact(id, data);
    await getContacts();
  };

  const handleDeleteContact = async (id: string) => {
    await deleteContact(id);
    await getContacts();
  };

  if (!email) {
    return null; // Redirecionará para /login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Meus Contatos</h1>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Adicionar Contato
          </button>
        </div>

        {showForm && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Novo Contato</h2>
            <ContactForm 
              onSubmit={handleCreateContact} 
              onCancel={() => setShowForm(false)} 
            />
          </div>
        )}

        {loading && !contacts ? (
          <div className="text-center py-8">
            <p>Carregando contatos...</p>
          </div>
        ) : error ? (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        ) : contacts && contacts.length > 0 ? (
          <ContactList 
            contacts={contacts} 
            onUpdate={handleUpdateContact} 
            onDelete={handleDeleteContact} 
          />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum contato cadastrado ainda.</p>
          </div>
        )}
      </main>
    </div>
  );
}