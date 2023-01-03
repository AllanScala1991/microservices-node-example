import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app: Express = express();
const port: Number = parseInt(process.env.PORT) || 3004;
const whiteList: Array<String> = [process.env.GATEWAY];

const corsOptions = {
    origin: function (origin, callback) {
        if(!origin || whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//PATIENT ROUTES


app.listen(port, () => {
    console.log("Patient service is running...");
})