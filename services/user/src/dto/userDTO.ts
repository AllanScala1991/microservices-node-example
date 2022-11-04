export interface IUserResponse {
    name: string
    email: string
    phone: string
    username: string
}

export interface IUserCreated extends IUserResponse{
    password: string
}

export interface Response {
    status: number
    data?: IUserResponse | IUserResponse[]
    message?: string
    token?: string
}

export interface IUserService {
    create(user: IUserCreated): Promise<Response>
    login(username: String, password: String): Promise<Response>
    findByName(name: String): Promise<Response>
    findById(id: String): Promise<Response>
    findAll(): Promise<Response>
    update(user: IUserResponse): Promise<Response>
    delete(id: String)
}