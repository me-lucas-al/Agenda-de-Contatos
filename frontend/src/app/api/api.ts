import { Contact, ContactCreate } from "@/types/contacts";

const API_URL = process.env.NEXT_PUBLIC_API_URL! || "https://agenda-de-contatos.onrender.com";

export const usersApi = {
  async healthCheck() {
    const response = await fetch(`${API_URL}/users/`);
    if (!response.ok) throw new Error('API não está respondendo');
    return await response.text();
  },

  async create(user: { name: string; email: string }) {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao criar usuário. O e-mail pode já estar em uso.');
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Não foi possível conectar ao servidor do Render. Ele pode estar "acordando", tente novamente em instantes.');
      }
      throw error;
    }
  },

  async login(email: string) {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Usuário não encontrado. Verifique seu e-mail ou cadastre-se.');
        }
        throw new Error('Erro ao fazer login. O servidor pode estar instável ou em manutenção.');
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Não foi possível conectar ao servidor do Render. Ele pode estar "acordando", tente novamente em instantes.');
      }
      throw error;
    }
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