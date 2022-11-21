import deep from "deep-email-validator";
import { IEmailValidator } from "../dto/emailValidatorDTO";

export class DeepValidator implements IEmailValidator {

    async validate(email: string): Promise<boolean> {
        const validator = await deep(email);
        return validator.validators.typo.valid;
    }
}