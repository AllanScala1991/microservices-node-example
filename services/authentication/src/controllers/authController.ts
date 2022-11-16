import { IAuthentication, IAuthenticationResponse } from "../dto/authDTO";
import { AuthenticationService } from "../services/authService";


export class AuthenticationController implements IAuthentication {
    constructor(
        private readonly authService: AuthenticationService = new AuthenticationService()
    ){}

    generateToken(name: string, email: string): IAuthenticationResponse {
        if(!name || !email) return{status: 400, message: "Nome ou Email inválidos."}

        const token = this.authService.generateToken(name, email);

        return {status: token.status, message: token.message, token: token.token}
    }

    verifyToken(token: string): IAuthenticationResponse {
        if(!token) return{status: 401, message: "Usuário não autorizado."}

        const verify = this.authService.verifyToken(token);

        return {status: verify.status, message: verify.message, verify: verify.verify}
    }
    
}