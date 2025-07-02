import { useState } from 'react';
import { Contact, ContactCreate } from '../types/contacts.d';

export const useContacts = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createContact = async (contactData: ContactCreate) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'email': localStorage.getItem('userEmail') || '',
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar contato');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/contacts', {
        headers: {
          'email': localStorage.getItem('userEmail') || '',
        },
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
const data = await response.json();
      setContacts(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar contatos');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async (id: string, contactData: Partial<Contact>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'email': localStorage.getItem('userEmail') || '',
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar contato');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'email': localStorage.getItem('userEmail') || '',
        },
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar contato');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    contacts,
    loading,
    error,
    createContact,
    getContacts,
    updateContact,
    deleteContact,
  };
};