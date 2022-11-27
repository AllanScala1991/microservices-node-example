import { PrismaClient } from "@prisma/client";
import { Encrypter } from "../../utils/bcryptjs";
import { IUserCreated, Response, IUserResponse, IUserService } from "../dto/userDTO";
import {UserRepository} from "../repository/userRepository";
import axios from "axios";
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

            if(user) delete createdUser.password;

            return {status: 201, data: createdUser}
            
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

            const auth = await this.getToken(usernameIsValid.name, usernameIsValid.email);

            if(!auth.data.token) return {status: 401, message: "Usuário ou Senha incorretos, tente novamente."}

            return {status: 200, token: auth.data.token}
            
        } catch (error) {
            return {status: 500, message: error}
        }
    }

    async findById(id: string): Promise<Response> {
        try {
            const user = await this.userRepository.user.findUnique({
                where: {
                    id: id
                }
            })

            if(user) delete user.password;

            return {status: 200, data: user}
        } catch (error) {
            return {status: 500, message: error}
        }
    }

    async findAll(): Promise<Response> {
        try {
            const users = await this.userRepository.user.findMany()
            let usersResponse = []

            for(let user of users) {
                delete user.password;
                usersResponse.push(user);
            }

            return {status: 200, data: usersResponse}

        } catch (error) {
            return {status: 500, message: error}
        }
    }

    async existsUserByMailOrUsername(email: string, username: string): Promise<Response> {
        try {
            const user = await this.userRepository.user.findFirst({
                where: {
                    OR: [
                        {
                            email: email
                        },
                        {
                            username: username
                        }
                    ]
                }

            })

            if(user) delete user.password;

            return {status: 200, data: user}
        } catch (error) {
            return {status: 500, message: error}
        }
    }

    async update(user: IUserResponse, id: string): Promise<Response> {
        try {
            const userUpdated = await this.userRepository.user.update({
                where: {
                    id: id
                },
                data: {
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    username: user.username,
                    updateAt: new Date()
                }
            })

            delete userUpdated.password

            return {status: 200, data: userUpdated}

        } catch (error) {
            return {status: 500, message: error}
        }
    }

    async delete(id: string): Promise<Response> {
        try {
            await this.userRepository.user.delete({
                where: {
                    id: id
                }
            })

            return {status: 200, message: "Usuário deletado com sucesso."}

        } catch (error) {
            return {status: 500, message: error}
        }
    }

        private async getToken(name: string, email: string): Promise<{data: {status: number, token?: string, message?: string}}> {
            return await axios.post(`${process.env.TOKEN_SERVICE}/token`, {
                name: name,
                email: email
            })
        }
}