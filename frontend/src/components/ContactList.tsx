import { useState } from 'react';
import { Contact } from '../types/contacts.d';
import { ContactForm } from './ContactForm';

interface ContactListProps {
  contacts: Contact[];
  onUpdate: (id: string, data: Partial<Contact>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
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

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              Nome
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Email
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Telefone
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Endereço
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {contacts.map((contact) => (
            <tr key={contact.id}>
              {editingId === contact.id ? (
                <td colSpan={5} className="px-4 py-4">
                  <ContactForm
                    initialData={contact}
                    onSubmit={handleUpdate}
                    onCancel={handleCancelEdit}
                  />
                </td>
              ) : (
                <>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {contact.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contact.email}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contact.phone}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {contact.street}, {contact.number}
                    {contact.complement && `, ${contact.complement}`}
                    <br />
                    {contact.district} - {contact.city}/{contact.state}
                    <br />
                    CEP: {contact.cep}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                      onClick={() => handleEdit(contact.id)}
                      className="text-primary-600 hover:text-primary-900 mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(contact.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Excluir
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};