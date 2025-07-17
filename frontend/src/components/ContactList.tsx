import { useState } from 'react';
import { Contact } from '../types/contacts.d';
import { ContactForm } from './ContactForm';

interface ContactListProps {
  contacts: Contact[];
  onUpdate: (id: string, data: Partial<Contact>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  userEmail?: string;
}

export const ContactList = ({ contacts, onUpdate, onDelete }: ContactListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleUpdate = async (data: Partial<Contact>) => {
    if (!editingId) return;
    await onUpdate(editingId, data);
    setEditingId(null);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (contacts.length === 0) {
    return (
      <div className="card p-12 text-center animate-fade-in">
        <svg className="w-20 h-20 text-gray-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 className="text-xl font-bold mb-2 gradient-text">Nenhum contato encontrado</h3>
        <p className="text-gray-400 mb-6">Adicione seu primeiro contato para começar</p>
        <button className="btn-primary">
          Adicionar Contato
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="hidden lg:block">
        <div className="card overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800/50">
                <tr>
                  <th scope="col" className="py-4 pl-6 pr-3 text-left text-sm font-semibold text-gray-300">
                    Contato
                  </th>
                  <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-gray-300">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-gray-300">
                    Telefone
                  </th>
                  <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-gray-300">
                    Endereço
                  </th>
                  <th scope="col" className="relative py-4 pl-3 pr-6">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 bg-gray-800/20">
                {contacts.map((contact, index) => (
                  <tr key={contact.id} className="hover:bg-gray-700/30 transition-colors animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                    {editingId === contact.id ? (
                      <td colSpan={5} className="px-6 py-6">
                        <ContactForm
                          initialData={contact}
                          onSubmit={handleUpdate}
                          onCancel={handleCancelEdit}
                        />
                      </td>
                    ) : (
                      <>
                        <td className="py-4 pl-6 pr-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                              <span className="text-white font-medium text-sm">
                                {getInitials(contact.name)}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">{contact.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-400">{contact.email}</td>
                        <td className="px-3 py-4 text-sm text-gray-400">{contact.phone}</td>
                        <td className="px-3 py-4 text-sm text-gray-400">
                          <div className="space-y-1">
                            <div>{contact.street}, {contact.number}</div>
                            {contact.complement && <div>{contact.complement}</div>}
                            <div>{contact.district} - {contact.city}/{contact.state}</div>
                            <div className="text-xs text-gray-500">CEP: {contact.cep}</div>
                          </div>
                        </td>
                        <td className="relative py-4 pl-3 pr-6 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(contact.id)}
                              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                              title="Editar contato"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => onDelete(contact.id)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                              title="Excluir contato"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="lg:hidden space-y-4">
        {contacts.map((contact, index) => (
          <div key={contact.id} className="card p-6 hover-glow transition-all duration-300 animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
            {editingId === contact.id ? (
              <ContactForm
                initialData={contact}
                onSubmit={handleUpdate}
                onCancel={handleCancelEdit}
              />
            ) : (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-medium">
                        {getInitials(contact.name)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{contact.name}</h3>
                      <p className="text-sm text-gray-400">{contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(contact.id)}
                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                      title="Editar contato"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(contact.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                      title="Excluir contato"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-400">{contact.phone}</span>
                  </div>
                  
                  <div className="flex items-start text-sm">
                    <svg className="w-4 h-4 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="text-gray-400">
                      <div>{contact.street}, {contact.number}</div>
                      {contact.complement && <div>{contact.complement}</div>}
                      <div>{contact.district} - {contact.city}/{contact.state}</div>
                      <div className="text-xs text-gray-500">CEP: {contact.cep}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};