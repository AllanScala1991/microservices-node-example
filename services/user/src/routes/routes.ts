import { Request, Response, Router } from "express";
import { UserController } from "../controllers/userController";

const app = Router();
const userController = new UserController();

app.get("/health", (res: Response) => {
    res.send("User service is online");
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


module.exports = app;