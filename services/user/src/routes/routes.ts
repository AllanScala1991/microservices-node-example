import { Request, Response, Router } from "express";
import { UserController } from "../controllers/userController";
import auth from "../middlewares/authentication/auth"

const app = Router();
const userController = new UserController();

app.get("/health", (req: Request, res: Response) => {
    res.status(200).send("User service is online");
})

app.post("/create", async (req: Request, res: Response) => {
    const {name, email, phone, username, password} = req.body;

    const response = await userController.create({name, email, phone, username, password})

    res.status(response.status).send(response);
})

app.post("/login", async (req: Request, res: Response) => {
    const {username, password} = req.body;

    const response = await userController.login(username, password);

    res.status(response.status).send(response)
})

app.get("/:id?", async (req: Request, res: Response) => {
    const id = req.params.id;

    if(!id) {
        const response = await userController.findAll();

        res.status(response.status).send(response)
    }else {
        const response = await userController.findById(id);

        res.status(response.status).send(response)
    }
})

app.put("/", auth, async (req: Request, res: Response) => {
    const {id, name, email, phone, username} = req.body;

    const response = await userController.update({name, email, phone, username}, id);

    res.status(response.status).send(response);
})

app.delete("/:id", auth, async (req: Request, res: Response) => {
    const id = req.params.id;

    const response = await userController.delete(id);

    res.status(response.status).send(response);
})

module.exports = app;