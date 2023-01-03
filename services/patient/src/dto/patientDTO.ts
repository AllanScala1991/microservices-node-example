export interface IPatient {
    create(patient: IPatientModel): Promise<Response>
    findAll(): Promise<{status: number, data?: IPatientResponseModel[], message?: string}>
    findById(id: string): Promise<Response>
    update(id: string, patient: IPatientUpdateModel): Promise<Response>
    delete(id: string): Promise<Response>
}

export interface IPatientModel {
    name: string
    email: string
    genrer: string
    phone: string
    cpf: string
    address: string
    insurance: string
    consults: string[]
    exams: string[]
}

export interface IPatientResponseModel {
    id: string
    name: string
    email: string
    genrer: string
    phone: string
    insurance: string
    consults: string[]
    exams: string[]
}

export interface IPatientUpdateModel {
    name: string
    email: string
    genrer: string
    phone: string
    address: string
    insurance: string
    consults: string[]
    exams: string[]
}

export interface Response {
    status: number
    data?: IPatientResponseModel
    message?: string
    token?: string
}
