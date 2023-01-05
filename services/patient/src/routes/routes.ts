import { Router, Request, Response } from "express";
import { PatientController } from "../controllers/patientController";
import auth from "../middlewares/auth"

const app = Router();
const patientController = new PatientController();

app.get("/health", (req: Request, res: Response) => {
    res.status(200).send("Patient service is online");
})

app.post("/create", auth, async (req: Request, res: Response) => {
    const {name, email, address, consults, cpf, exams, genrer, insurance, phone} = req.body;

    const response = await patientController.create({name, email, address, consults, cpf, exams, 
    genrer, insurance, phone});

    res.status(response.status).send(response);
})

app.get("/:id?", auth, async (req: Request, res: Response) => {
    const id = req.params.id;

    if(id) {
        const response = await patientController.findById(id);

        res.status(response.status).send(response);
    } else {
        const response = await patientController.findAll();

        res.status(response.status).send(response);
    }
})

app.put("/", auth, async (req: Request, res: Response) => {
    const {id, address, consults, email, exams, genrer, insurance, name, phone} = req.body;

    const response = await patientController.update(id, {address, consults, email, exams, genrer, 
    insurance, name, phone});

    res.status(response.status).send(response);
})

app.delete("/:id", auth, async (req: Request, res: Response) => {
    const id = req.params.id;

    const response = await patientController.delete(id);

    res.status(response.status).send(response);
})

module.exports = app;