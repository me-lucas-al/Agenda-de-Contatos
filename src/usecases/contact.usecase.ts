import { ContactCreate, ContactRepository } from "../interfaces/contacts.interface";
import { ContactsRepositoryPrisma } from "../repositories/contacts.repository";

class ContactUseCase {
    private contactRepository: ContactRepository;
    constructor(){
        this.contactRepository = new ContactsRepositoryPrisma;
    }

    async create({email, id, name, phone, userEmail}: ContactCreate) {

    }
}

export { ContactUseCase };