import { sign, verify } from "jsonwebtoken";
import { IAuthentication, IAuthenticationResponse } from "../dto/authDTO";

export class AuthenticationService implements IAuthentication {

    generateToken(name: string, email: string): IAuthenticationResponse {
        try {
            const token = sign({
                name: name,
                email: email
            }, `${process.env.SECRET_TOKEN}`,{
                expiresIn: "1d"
            })

            return {status: 200, token: token}

        } catch (error) {
            return {status: 500, message: error}
        }
    }

    verifyToken(token: string): IAuthenticationResponse {
        try {
            const tokenVerify = verify(token, `${process.env.SECRET_TOKEN}`)

            return {status: 200, verify: tokenVerify}

        } catch (error) {
            return {status: 401, message: "Usuário não autorizado."}
        }
    }
    
}