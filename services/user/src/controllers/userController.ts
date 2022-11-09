import { Encrypter } from "../../utils/bcryptjs";
import { IUserCreated, Response, IUserService, IUserResponse } from "../dto/userDTO";
import { UserService } from "../services/userService";

export class UserController implements IUserService {
    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly encrypter: Encrypter = new Encrypter()
    ) {}

    async create(user: IUserCreated): Promise<Response> {
        if(!user.name || !user.email || !user.phone || !user.username || !user.password) {
            return {status: 400, message: "Todos os campos devem ser preenchidos, tente novamente."}
        }
        // VALIDAR SE EMAIL ESTÁ NO FORMATO CORRETO(FAZER APOS O MICROSERVICO ESTAR PRONTO)

        const userExists = await this.userService.existsUserByMailOrUsername(user.email, user.username);

        if(userExists.data) {
            return {status: 409, message: "Usuário já cadastrado, recupere a senha ou tente novamente."}
        }

        user.password = await this.encrypter.hash(user.password, 8);

        return await this.userService.create(user);
    }

    async login(username: string, password: string): Promise<Response> {
        if(!username || !password) return {status: 401, message: "Usuário ou Senha incorretos, tente novamente."}

        return await this.userService.login(username, password);
    }

    async findById(id: string): Promise<Response> {
        if(!id) return {status: 400, message: "O campo ID é obrigatório."}

        return await this.userService.findById(id);
    }

    async findAll(): Promise<Response> {
        return await this.userService.findAll();
    }

    async existsUserByMailOrUsername(email: string, username: string): Promise<Response> {
        if(!email || !username) return {status: 400, message: "Email ou Username inválidos."}

        return await this.userService.existsUserByMailOrUsername(email, username);
    }

    async update(user: IUserResponse, id: string): Promise<Response> {
        if(!user.name || !user.email || !user.phone || !user.username || !id) {
            return {status: 400, message: "Todos os campos devem ser preenchidos, tente novamente."}
        }

        return await this.userService.update(user, id);
    }

    async delete(id: string): Promise<Response> {
        if(!id) return {status: 400, message: "ID inválido."}

        return await this.userService.delete(id);
    }
}