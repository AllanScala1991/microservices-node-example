import { hash, compare } from "bcryptjs";


export class Encrypter {

    async hash(value: string, salt: number): Promise<string> {
        return await hash(value, salt);
    }

    async compare(currentValue: string, hashValue: string): Promise<boolean> {
        return await compare(currentValue, hashValue);
    }
}