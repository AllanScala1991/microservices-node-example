import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config"

const app: Express = express();
const port: number = parseInt(process.env.PORT) || 3009
const whiteList : Array<String> = [process.env.GATEWAY, process.env.USER_SERVICE];

const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whiteList.indexOf(origin) !== -1) {
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

// USER ROUTES
app.use(require("./routes/routes"));

app.listen(port, () => {
    console.log("Authentication service is running...");
})
