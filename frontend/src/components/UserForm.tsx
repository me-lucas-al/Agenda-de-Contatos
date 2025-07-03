import { useState } from 'react';
import { UserCreate } from '../types/users.d';

interface UserFormProps {
  initialData?: Partial<UserCreate>;
  onSubmit: (data: UserCreate) => Promise<void>;
  onCancel?: () => void;
  isRegister?: boolean;
}


export const UserForm = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isRegister = false 
}: UserFormProps) => {
  const [formData, setFormData] = useState<UserCreate>({
    name: initialData?.name || '',
    email: initialData?.email || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!formData.name || !formData.email) {
      setErrors({ general: 'Preencha todos os campos obrigatórios' });
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({ general: error instanceof Error ? error.message : 'Erro ao processar formulário' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="rounded-md bg-red-50 p-4 mb-4">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {isRegister ? 'Cadastrar' : 'Salvar'}
        </button>
      </div>
    </form>
  );
};