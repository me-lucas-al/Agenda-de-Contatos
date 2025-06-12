export interface Contact{
    id: string;
    email: string;
    name: string;
    phone: string;
    userId: string;
}

export interface ContactCreate{
    id: string;
    email: string;
    name: string;
    phone: string;
    userId: string;
}

export interface ContactRepository {
    create(data: ContactCreate): Promise<Contact>
}