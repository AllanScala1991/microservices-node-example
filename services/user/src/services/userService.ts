import { PrismaClient } from "@prisma/client";
import { Encrypter } from "../../utils/bcryptjs";
import { IUserCreated, Response, IUserResponse, IUserService } from "../dto/userDTO";
import {UserRepository} from "../repository/userRepository";

export class UserService implements IUserService {
    constructor(
        private readonly userRepository: PrismaClient = new UserRepository(),
        private readonly encrypter: Encrypter = new Encrypter()
        ){}

    async create(user: IUserCreated): Promise<Response> {
        try {
            const createdUser = await this.userRepository.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    username: user.username,
                    password: user.password,
                    createdAt: new Date(),
                    updateAt: new Date()
                }
            })

            return {status: 201, data: {name: createdUser.name, email: createdUser.email, phone: createdUser.phone, username: createdUser.username}}
            
        } catch (error) {
            return {status: 500, message: error}
        }
    }

    async login(username: string, password: string): Promise<Response> {
        try {
            const usernameIsValid = await this.userRepository.user.findFirst({
                where: {
                    username: username
                }
            })

            if(!usernameIsValid) return {status: 401, message: "Usuário ou Senha incorretos, tente novamente."}

            const passwordIsValid = await this.encrypter.compare(password, usernameIsValid.password);

            if(!passwordIsValid) return {status: 401, message: "Usuário ou Senha incorretos, tente novamente."}

            // CRIAR O TOKEN APOS O MICROSERVICO DE AUTENTICACAO FOR CRIADO

            return {status: 200, token: "teste"}
            
        } catch (error) {
            return {status: 500, message: error}
        }
    }

    findByName(name: string): Promise<Response> {
        throw new Error("Method not implemented.");
    }

    findById(id: string): Promise<Response> {
        throw new Error("Method not implemented.");
    }

    findAll(): Promise<Response> {
        throw new Error("Method not implemented.");
    }

    update(user: IUserResponse): Promise<Response> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): void {
        throw new Error("Method not implemented.");
    }

  
}