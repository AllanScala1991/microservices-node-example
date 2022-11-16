import { Router, Request, Response } from "express";
import { AuthenticationController } from "../controllers/authController";

const app = Router();
const authController = new AuthenticationController();

app.get("/health", (req: Request, res: Response) => {
    res.send("Authentication service is online.")
})

app.post("/token", (req: Request, res: Response) => {
    const {name, email} = req.body;

    const response = authController.generateToken(name, email);

    res.status(response.status).send(response);
})

app.post("/verify", (req: Request, res: Response) => {
    const {token} = req.body;

    const response = authController.verifyToken(token);

    res.status(response.status).send(response);
})

module.exports = app;