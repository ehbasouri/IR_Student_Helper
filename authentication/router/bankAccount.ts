import express from "express";
import { addBankAccountController } from "../controller";
import makeExpressCallback from "../express-callback";

const bankAccountRouter = express.Router();

bankAccountRouter.post("/add", makeExpressCallback(addBankAccountController))

export {bankAccountRouter};
