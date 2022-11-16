import { JwtPayload } from "jsonwebtoken"

export interface IAuthentication {
    generateToken(name: string, email: string): IAuthenticationResponse
    verifyToken(token: string): IAuthenticationResponse
}

export interface IAuthenticationResponse {
    status: number
    token?: string
    message?: string
    verify?: string | JwtPayload
}