import { User, UserCreate, UserRepository } from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class UserUseCase {
    private userRepository: UserRepository;
    constructor(){
        this.userRepository = new UserRepositoryPrisma();
    }

    async create({name, email}: UserCreate): Promise<User>{
        const verifyIfUserExists = await this.userRepository.findByEmail(email);
        if(verifyIfUserExists){
            throw new Error("Usuário já existente")
        }
        const result = await this.userRepository.create({ email, name });

        return result
    }

    async findByEmail(email: string): Promise<User | null> {
  return this.userRepository.findByEmail(email);
}

}

export { UserUseCase }