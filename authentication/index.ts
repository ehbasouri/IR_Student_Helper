import express, {Express} from "express";
import db from "../db"
import bodyParser from "body-parser";
import apiRouter from "./router/routing";
import morgan from "morgan"

const app : Express = express();

app.use(bodyParser.json());
app.use(morgan('combined'));

db.connect(
    "mongodb://localhost:27017"
    , (err: { message: any; stack: any; }) => {
    if (err) {
        console.log(err.message, err.stack, 'can not connect to database server'); 
        process.exit(-1);
    }
});

app.use("/api", apiRouter);

app.listen(5600, ()=>{
    console.log("server is listening on 5600");
})
