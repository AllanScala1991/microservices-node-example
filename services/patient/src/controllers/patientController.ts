import { IPatientModel, IPatientResponseModel, IPatientUpdateModel, Response } from "../dto/patientDTO";
import { PatientService } from "../services/patientService";



export class PatientController{
    constructor(
        private readonly patientService: PatientService = new PatientService()
    ){}

    async create(patient: IPatientModel): Promise<Response> {
        if(!patient.name || !patient.email || !patient.address || !patient.consults ||
            !patient.cpf || !patient.exams || !patient.genrer || !patient.insurance || !patient.phone) {
                return {status: 400, message: "Todos os campos devem ser preenchidos."}
            }
        
        const cpfExists = await this.patientService.findByCpf(patient.cpf);

        if(cpfExists.data) {return {status: 409, message: "Já existe um paciente cadastrado com esse documento."}};

        const createPatient = await this.patientService.create(patient);

        return createPatient;
    }

    async findAll(): Promise<{ status: number; data?: IPatientResponseModel[]; message?: string; }> {
        const findAllPatients = await this.patientService.findAll();

        return findAllPatients;
    }

    async findById(id: string): Promise<Response> {
        if(!id) return {status: 400, message: "ID inválido, tente novamente."}

        const findPatientById = await this.patientService.findById(id);

        return findPatientById;
    }

    async update(id: string, patient: IPatientUpdateModel): Promise<Response> {
        if(!id || !patient.address || !patient.consults || !patient.email ||
            !patient.exams || !patient.genrer || !patient.insurance ||
            !patient.name || !patient.phone) 
            return {status: 400, message: "Todos os campos devem ser preenchidos."};

        const patientExists = await this.patientService.findById(id);

        if(!patientExists) return {status: 404, message: "Paciente não localizado, tente novamente."}

        const updatePatient = await this.patientService.update(id, patient);

        return updatePatient;
    }

    async delete(id: string): Promise<Response> {
        if(!id) return {status: 400, message: "ID inválido, tente novamente."};

        const patientExists = await this.patientService.findById(id);

        if(!patientExists) return {status: 404, message: "Paciente não localizado, tente novamente."}

        const deletePatient = await this.patientService.delete(id);

        return deletePatient;
    }

    
}