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
        // VALIDAR SE NAO EXISTE UM USUARIO COM MESMO EMAIL
        // VALIDAR SE NAO EXISTE UM USUARIO COM MESMO USERNAME

        user.password = await this.encrypter.hash(user.password, 8);

        return await this.userService.create(user);
    }

    async login(username: string, password: string): Promise<Response> {
        if(!username || !password) return {status: 401, message: "Usuário ou Senha incorretos, tente novamente."}

        return await this.userService.login(username, password);
    }

    async findByName(name: string): Promise<Response> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<Response> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<Response> {
        throw new Error("Method not implemented.");
    }

    async update(user: IUserResponse): Promise<Response> {
        throw new Error("Method not implemented.");
    }

    delete(id: string) {
        throw new Error("Method not implemented.");
    }

    
}