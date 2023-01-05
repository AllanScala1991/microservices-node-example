import { PrismaClient } from "@prisma/client";
import { IPatient, IPatientModel, IPatientResponseModel, IPatientUpdateModel, Response } from "../dto/patientDTO";
import { PatientRepository } from "../repository/patientRepository";


export class PatientService implements IPatient {
    constructor(
        private readonly patientRepository: PrismaClient = new PatientRepository()
    ){};

    async create(patient: IPatientModel): Promise<Response> {
        try {
            const patientCreate = await this.patientRepository.patient.create({
                data: {
                    name: patient.name,
                    email: patient.email,
                    genrer: patient.genrer,
                    phone: patient.phone,
                    cpf: patient.cpf,
                    address: patient.address,
                    insurance: patient.insurance,
                    consults: patient.consults,
                    exams: patient.exams,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            })

            return {status: 201, data: patientCreate};
        } catch (error) {
            return {status: 500, message: error};
        }
    }

    async findAll(): Promise<{ status: number; data?: IPatientResponseModel[]; message?: string; }> {
        try {
            const patients = await this.patientRepository.patient.findMany();

            return {status: 200, data: patients};
        } catch (error) {
            return {status: 500, message: error};
        }
    }

    async findById(id: string): Promise<Response> {
        try {
            const patient = await this.patientRepository.patient.findUnique({
                where: {
                    id: id
                }
            })
            
            if(!patient) return {status: 404, message: "Nenhum paciente localizado."};

            return {status: 200, data: patient};
        } catch (error) {
            return {status: 500, message: error}
        }
    }

    async findByCpf(cpf: string): Promise<Response> {
        try {
            const patient = await this.patientRepository.patient.findFirst({
                where: {
                    cpf: cpf
                }
            })

            return {status: 200, data: patient}
        } catch (error) {
            return {status: 500, message: error}
        }
    }

    async update(id: string, patient: IPatientUpdateModel): Promise<Response> {
        try {
            const patientUpdated = await this.patientRepository.patient.update({
                where: {
                    id: id
                },
                data: {
                    name: patient.name,
                    email: patient.email,
                    genrer: patient.genrer,
                    phone: patient.phone,
                    address: patient.address,
                    insurance: patient.insurance,
                    consults: patient.consults,
                    exams: patient.exams,
                    updatedAt: new Date()
                }
            })

            return {status: 200, data: patientUpdated};
        } catch (error) {
            return {status: 500, message: error}
        }
    }

    async delete(id: string): Promise<Response> {
        try {
            await this.patientRepository.patient.delete({
                where: {
                    id: id
                }
            });

            return {status: 200, message: "Paciente deletado com sucesso."};
        } catch (error) {
            return {status: 500, message: error}
        }
    }
    
}