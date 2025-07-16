export interface Contact {
  id: string;
  email: string;
  name: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  complement?: string | null;
  userId: string;
}

export interface ContactCreate {
  email: string;
  name: string;
  phone: string;
  cep: string;
  number: string;
  complement?: string | null;
  userEmail: string;
}
export interface ContactFormData {
  email: string;
  name: string;
  phone: string;
  cep: string;
  number: string;
  complement?: string | null;
}

export interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento?: string | null;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}