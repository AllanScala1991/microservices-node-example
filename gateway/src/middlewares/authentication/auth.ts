import axios from "axios";
import { NextFunction, Request, Response, Router } from "express";
import { MICROSERVICE } from "../../config/microservices"

const app: Router = Router();

app.use(async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if(!authorization) return res.status(403).send({message: "Usuário não autorizado."})

    const token = authorization.split(" ");

    try {
        await axios.post(`${MICROSERVICE.AUTHENTICATION}/verify`, {
            token: token[1]
        })

        return next();
    } catch (error) {
        return res.status(403).send({message: "Usuário não autorizado."})
    }
})

export default app;