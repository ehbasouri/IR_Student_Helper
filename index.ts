import express, {Express, Request, Response} from "express";
import db from "./db"
import bodyParser from "body-parser";
import {apiRouter, bankAccountRouter} from "./authentication/router";
import morgan from "morgan"
import BankAccount from "./authentication/models/BankAccount";
import User from "./authentication/models/User";
import { UserType } from "./authentication/entities/user";

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

app.use("/api/user", apiRouter);
app.use("/api/bankAccount", bankAccountRouter);

app.listen(5600, ()=>{
    console.log("server is listening on 5600");
})
