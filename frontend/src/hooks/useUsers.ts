import { useState } from 'react';
import { UserCreate } from '../types/users.d';

export const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (userData: UserCreate) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createUser,
  };
};