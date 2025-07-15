'use client';

import { useState, useEffect } from 'react';
import { Contact, ContactCreate } from '../types/contacts';
import { useAuth } from '../contexts/AuthContext';
import { contactsApi } from "../app/api/api"

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { email } = useAuth();

  const fetchContacts = async () => {
    if (!email) {
      setContacts([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await contactsApi.getContacts(email);
      setContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar contatos');
    } finally {
      setLoading(false);
    }
  };

  const createContact = async (contactData: ContactCreate) => {
    if (!email) throw new Error('Usuário não autenticado');
    
    setLoading(true);
    setError(null);
    try {
      const newContact = await contactsApi.createContact(contactData, email);
      setContacts(prev => [...prev, newContact]);
      return newContact;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar contato';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async (id: string, contactData: Partial<Contact>) => {
    if (!email) throw new Error('Usuário não autenticado');
    
    setLoading(true);
    setError(null);
    try {
      const updatedContact = await contactsApi.updateContact(id, contactData, email);
      setContacts(prev => 
        prev.map(contact => contact.id === id ? updatedContact : contact)
      );
      return updatedContact;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao atualizar contato';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id: string) => {
    if (!email) throw new Error('Usuário não autenticado');
    
    setLoading(true);
    setError(null);
    try {
      await contactsApi.deleteContact(id, email);
      setContacts(prev => prev.filter(contact => contact.id !== id));
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao deletar contato';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [email]);

  return {
    contacts,
    loading,
    error,
    createContact,
    getContacts: fetchContacts,
    updateContact,
    deleteContact,
  };
};