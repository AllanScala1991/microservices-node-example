export interface IUserResponse {
    id?: string
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
    data?: IUserResponse
    message?: string
    token?: string
}

export interface IUserService {
    create(user: IUserCreated): Promise<Response>
    login(username: String, password: String): Promise<Response>
    findById(id: String): Promise<Response>
    findAll(): Promise<{status: number, data?: IUserResponse[], message?: string}>
    existsUserByMailOrUsername(emailOrUsername: string): Promise<Response>
    update(user: IUserResponse, id: string): Promise<Response>
    delete(id: String): Promise<Response>
}