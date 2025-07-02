import { useState, useEffect } from 'react';
import { Contact, ContactCreate } from '../types/contacts.d';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  complement?: string;
  userId?: string;
}

interface ContactFormProps {
  initialData?: Partial<Contact>;
  onSubmit: (data: ContactFormData) => Promise<void>;
  onCancel?: () => void;
}

export const ContactForm = ({ initialData, onSubmit, onCancel }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    cep: initialData?.cep || '',
    street: initialData?.street || '',
    number: initialData?.number || '',
    district: initialData?.district || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    complement: initialData?.complement || '',
    userId: initialData?.userId,
  });

  const [loadingCep, setLoadingCep] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCepBlur = async () => {
    if (!formData.cep || formData.cep.length !== 8) return;

    setLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErrors(prev => ({ ...prev, cep: 'CEP não encontrado' }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        street: data.logradouro || '',
        district: data.bairro || '',
        city: data.localidade || '',
        state: data.uf || '',
      }));
      setErrors(prev => ({ ...prev, cep: '' }));
    } catch (error) {
      setErrors(prev => ({ ...prev, cep: 'Erro ao buscar CEP' }));
    } finally {
      setLoadingCep(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.cep || !formData.number) {
      setErrors({ general: 'Preencha todos os campos obrigatórios' });
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setErrors({ general: 'Erro ao salvar contato' });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ''}
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
            value={formData.email || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Telefone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
            CEP *
          </label>
          <input
            type="text"
            id="cep"
            name="cep"
            value={formData.cep || ''}
            onChange={handleChange}
            onBlur={handleCepBlur}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
          {errors.cep && <p className="mt-1 text-sm text-red-600">{errors.cep}</p>}
          {loadingCep && <p className="mt-1 text-sm text-gray-500">Buscando CEP...</p>}
        </div>

        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">
            Rua
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street || ''}
            onChange={handleChange}
            readOnly={loadingCep}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-700">
            Número *
          </label>
          <input
            type="text"
            id="number"
            name="number"
            value={formData.number || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700">
            Bairro
          </label>
          <input
            type="text"
            id="district"
            name="district"
            value={formData.district || ''}
            onChange={handleChange}
            readOnly={loadingCep}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Cidade
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city || ''}
            onChange={handleChange}
            readOnly={loadingCep}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state || ''}
            onChange={handleChange}
            readOnly={loadingCep}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="complement" className="block text-sm font-medium text-gray-700">
            Complemento
          </label>
          <input
            type="text"
            id="complement"
            name="complement"
            value={formData.complement || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
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
          {initialData?.id ? 'Atualizar' : 'Salvar'}
        </button>
      </div>
    </form>
  );
};