import { User } from "../../entities/User";
import { ImailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase{
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: ImailProvider
    ){}
    async execute(data: ICreateUserRequestDTO){
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if(userAlreadyExists)
        {
            throw new Error('User already exists');
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        this.mailProvider.sendMail({
            to:{
                name:data.name,
                email:data.email
            },
            from:{
                name:"Teste de E-mail",
                email:"teste@gmail.com",
            },
            subject:"Isso é um e-mail teste",
            body:"Ignore este e-mail pois é apenas um teste"
        })
    }
}