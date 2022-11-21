import { DeepValidator } from "../adapter/deepEmailValidator";
import { IEmailValidator } from "../dto/emailValidatorDTO";


export class EmailValidatorService implements IEmailValidator {
    constructor(
        private readonly emailValidatorAdapter: IEmailValidator = new DeepValidator()
    ){}

    async validate(email: string): Promise<boolean> {
        try {
            return await this.emailValidatorAdapter.validate(email)
        } catch (error) {
            return error
        }
    }
}