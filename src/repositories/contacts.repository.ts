import { Contact, ContactCreate, ContactRepository } from "../interfaces/contacts.interface";

class ContactsRepositoryPrisma implements ContactRepository{
    create(data: ContactCreate): Promise<Contact> {
        
    }
}

export { ContactsRepositoryPrisma }