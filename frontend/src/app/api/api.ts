import { Contact, ContactCreate } from "@/types/contacts";

const API_URL = 'http://localhost:3100';

export const usersApi = {
  async healthCheck() {
    const response = await fetch(`${API_URL}/users/`);
    if (!response.ok) throw new Error('API não está respondendo');
    return await response.text();
  },

  async create(user: { name: string; email: string }) {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao criar usuário');
    }
    
    return await response.json();
  },

  async login(email: string) {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      throw new Error('Usuário não encontrado');
    }
    
    return await response.json();
  }
};

export const contactsApi = {
  async getContacts(email: string) {
    const response = await fetch(`${API_URL}/contacts`, {
      headers: {
        'email': email,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao buscar contatos');
    }
    
    return await response.json();
  },

  async createContact(contactData: ContactCreate, email: string) {
    const response = await fetch(`${API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'email': email,
      },
      body: JSON.stringify(contactData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao criar contato');
    }
    
    return await response.json();
  },

  async updateContact(id: string, contactData: Partial<Contact>, email: string) {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'email': email,
      },
      body: JSON.stringify(contactData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao atualizar contato');
    }
    
    return await response.json();
  },

  async deleteContact(id: string, email: string) {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'DELETE',
      headers: {
        'email': email,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao deletar contato');
    }
    
    return true;
  }
};