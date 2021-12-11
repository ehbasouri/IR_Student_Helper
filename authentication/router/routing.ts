import express from "express";
import { loginController, registerController } from "../controller";
import makeExpressCallback from "../express-callback";

const apiRouter = express.Router();

apiRouter.post("/register", makeExpressCallback(registerController))
apiRouter.post("/login", makeExpressCallback(loginController))

export default apiRouter;
