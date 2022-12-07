import { AuthenticationService } from "./authService";

const authService: AuthenticationService = new AuthenticationService();

test("Generate new token", () => {
    const newToken = authService.generateToken("test", "test@email.com");

    expect(newToken.status).toEqual(200);
    expect(newToken.token).not.toBeNull;
    
})

test("Validate token", () => {
    let token = authService.generateToken("test", "test@email.com").token;

    const verify = authService.verifyToken(token);

    expect(verify.status).toEqual(200);
    expect(verify.verify).toMatchObject({
        name: 'test',
        email: 'test@email.com'
    })
})

test("Send invalid token to validate", () => {
    const verify= authService.verifyToken("invalid");
    
    expect(verify.status).toEqual(401);
    expect(verify.message).toEqual("Usuário não autorizado.")
})