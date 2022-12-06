import { DeepValidator } from "./deepEmailValidator"

let deepValidator: DeepValidator;

beforeAll(() => {
    deepValidator = new DeepValidator();
})

test("Send valid email", async () => {
    const emailIsValid = await deepValidator.validate("email@email.com");

    expect(emailIsValid).toBeTruthy;
})

test("Send invalid email", async () => {
    const emailIsValid = await deepValidator.validate("email@.com");

    expect(emailIsValid).toBeFalsy;
})