import { PatientService } from "./patientService";
import chance from "chance";

let patientService: PatientService;
let patientId = [];

beforeAll(() => {
    patientService = new PatientService();
})

test("Create new patient successfully", async () => {
    const patient = await patientService.create({
        name: chance().name(),
        email: `${chance().name()}@email.com`,
        genrer: "M",
        phone: "4199999-9999",
        cpf: "55555555555",
        address: "Rua das andorinhas - 559",
        insurance: "Mediprev LTDA",
        consults: ["a78s6d8ad76a8s6786a8sd687as68d6as", "45g3h4f53h54f3g54h3f54g3h54f3g5h3f"],
        exams: ["d235y34g676f74ç5v6gh4cvghk23gc42h"]
    })

    expect(patient.status).toEqual(201);
    expect(patient.data).not.toBeNull;
    patientId.push(patient.data.id);
})

test("Find all patients", async () => {
    const patient = await patientService.create({
        name: chance().name(),
        email: `${chance().name()}@email.com`,
        genrer: "M",
        phone: "4199999-9999",
        cpf: "55555555555",
        address: "Rua das andorinhas - 559",
        insurance: "Mediprev LTDA",
        consults: ["a78s6d8ad76a8s6786a8sd687as68d6as", "45g3h4f53h54f3g54h3f54g3h54f3g5h3f"],
        exams: ["d235y34g676f74ç5v6gh4cvghk23gc42h"]
    })
    patientId.push(patient.data.id);

    const patients = await patientService.findAll();

    expect(patients.status).toEqual(200);
    expect(patients.data.length).toBeGreaterThan(0);
})

test("Find patient by ID", async () => {
    const patient = await patientService.create({
        name: "Patient Name",
        email: `${chance().name()}@email.com`,
        genrer: "M",
        phone: "4199999-9999",
        cpf: "55555555555",
        address: "Rua das andorinhas - 559",
        insurance: "Mediprev LTDA",
        consults: ["a78s6d8ad76a8s6786a8sd687as68d6as", "45g3h4f53h54f3g54h3f54g3h54f3g5h3f"],
        exams: ["d235y34g676f74ç5v6gh4cvghk23gc42h"]
    })
    patientId.push(patient.data.id);

    const findPatient = await patientService.findById(patient.data.id);

    expect(findPatient.status).toEqual(200);
    expect(findPatient.data.name).toEqual("Patient Name");
})

test("Find patient by CPF", async () => {
    const patient = await patientService.create({
        name: "Fynd By CPF",
        email: `${chance().name()}@email.com`,
        genrer: "M",
        phone: "4199999-9999",
        cpf: "12345678901",
        address: "Rua das andorinhas - 559",
        insurance: "Mediprev LTDA",
        consults: ["a78s6d8ad76a8s6786a8sd687as68d6as", "45g3h4f53h54f3g54h3f54g3h54f3g5h3f"],
        exams: ["d235y34g676f74ç5v6gh4cvghk23gc42h"]
    })
    patientId.push(patient.data.id);

    const findPatient = await patientService.findByCpf("12345678901");

    expect(findPatient.status).toEqual(200);
    expect(findPatient.data.name).toEqual("Fynd By CPF");
})

test("Find patient with invalid ID", async () => {
    const findPatient = await patientService.findById("invalid");

    expect(findPatient.data).toBeNull;
})

test("Update patient name sucessfully", async () => {
    const patient = await patientService.create({
        name: "My Patient Name",
        email: `${chance().name()}@email.com`,
        genrer: "M",
        phone: "4199999-9999",
        cpf: "55555555555",
        address: "Rua das andorinhas - 559",
        insurance: "Mediprev LTDA",
        consults: ["a78s6d8ad76a8s6786a8sd687as68d6as", "45g3h4f53h54f3g54h3f54g3h54f3g5h3f"],
        exams: ["d235y34g676f74ç5v6gh4cvghk23gc42h"]
    })
    patientId.push(patient.data.id);

    const updatePatient = await patientService.update(patient.data.id, {
        name: "Updated Patient Name",
        email: `${chance().name()}@email.com`,
        genrer: "M",
        phone: "4199999-9999",
        address: "Rua das andorinhas - 559",
        insurance: "Mediprev LTDA",
        consults: ["a78s6d8ad76a8s6786a8sd687as68d6as", "45g3h4f53h54f3g54h3f54g3h54f3g5h3f"],
        exams: ["d235y34g676f74ç5v6gh4cvghk23gc42h"]
    })

    expect(updatePatient.status).toEqual(200);
    expect(updatePatient.data.name).toEqual("Updated Patient Name");
})

test("Update patient with invalid ID", async () => {
    const updatePatient = await patientService.update("invalid", {
        name: "Updated Patient Name",
        email: `${chance().name()}@email.com`,
        genrer: "M",
        phone: "4199999-9999",
        address: "Rua das andorinhas - 559",
        insurance: "Mediprev LTDA",
        consults: ["a78s6d8ad76a8s6786a8sd687as68d6as", "45g3h4f53h54f3g54h3f54g3h54f3g5h3f"],
        exams: ["d235y34g676f74ç5v6gh4cvghk23gc42h"]
    })

    expect(updatePatient.status).toEqual(500);
})

test("Delete patient sucessfully", async () => {
    const patient = await patientService.create({
        name: "Deleted Patient",
        email: `${chance().name()}@email.com`,
        genrer: "M",
        phone: "4199999-9999",
        cpf: "55555555555",
        address: "Rua das andorinhas - 559",
        insurance: "Mediprev LTDA",
        consults: ["a78s6d8ad76a8s6786a8sd687as68d6as", "45g3h4f53h54f3g54h3f54g3h54f3g5h3f"],
        exams: ["d235y34g676f74ç5v6gh4cvghk23gc42h"]
    })
    
    const deletedPatient = await patientService.delete(patient.data.id);

    expect(deletedPatient.status).toEqual(200);
    expect(deletedPatient.message).toEqual("Paciente deletado com sucesso.");

})

test("Delete patient with invalid ID", async () => {
    const deletedPatient = await patientService.delete("invalid");
    expect(deletedPatient.status).toEqual(500);
})


afterAll(() => {
    patientId.forEach(async (id) => {
        await patientService.delete(id);
    })
})