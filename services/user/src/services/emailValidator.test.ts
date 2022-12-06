import { EmailValidatorService } from "./emailValidatorService";

let deepValidator: EmailValidatorService;

beforeAll(() => {
    deepValidator = new EmailValidatorService();
})

test("Send valid email", async () => {
    const emailIsValid = await deepValidator.validate("email@email.com");

    expect(emailIsValid).toBeTruthy;
})

test("Send invalid email", async () => {
    const emailIsValid = await deepValidator.validate("email@.com");

    expect(emailIsValid).toBeFalsy;
})