export interface Contact{
    id: string;
    email: string;
    name: string;
    phone: string;
    userId?: string;
}

export interface ContactCreate{
    email: string;
    name: string;
    phone: string;
    userEmail: string;
}

export interface ContactCreateData{
    email: string;
    name: string;
    phone: string;
    userId: string;
}

export interface ContactRepository {
    create(data: ContactCreateData): Promise<Contact>
    findByEmailOrPhone(email: string, phone:string ): Promise<Contact | null>;
    findAllContacts(userId: string): Promise<Contact[]>;
    updateContact({id, name, email, phone}: Contact): Promise<Contact[]>;
}