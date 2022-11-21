import express, { Express } from "express";
import "dotenv/config";
import cors from "cors";
import body from "body-parser";
import proxy from "express-http-proxy";
import { MICROSERVICE } from "./config/microservices";

const app: Express = express();
const PORT = parseInt(process.env.PORT) || 3000
const whiteList = []
const corsOptions = {
    origin: (origin, callback) => {
        if(!origin || whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        }else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}

app.use(cors(corsOptions));
app.use(body.json());
app.use(body.urlencoded({extended: false}));

// Microservices redirections
app.use("/user", proxy(MICROSERVICE.USER))
app.use("/exam", proxy(MICROSERVICE.EXAM))
app.use("/consult", proxy(MICROSERVICE.CONSULT))
app.use("/patient", proxy(MICROSERVICE.PATIENT))
app.use("/doctor", proxy(MICROSERVICE.DOCTOR))
app.use("/insurance", proxy(MICROSERVICE.INSURANCE_MEDICAL))
app.use("/financial", proxy(MICROSERVICE.FINANCIAL))
app.use("/auth", proxy(MICROSERVICE.AUTHENTICATION))

app.listen(PORT, () => {
    console.log("Gateway is running");
})