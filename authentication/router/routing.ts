import express from "express";
import { getUserInfoController, loginController, registerController, updateUserInfoController } from "../controller";
import makeExpressCallback from "../express-callback";

const apiRouter = express.Router();

apiRouter.post("/register", makeExpressCallback(registerController))
apiRouter.post("/login", makeExpressCallback(loginController))
apiRouter.get("/info", makeExpressCallback(getUserInfoController))
apiRouter.put("/update", makeExpressCallback(updateUserInfoController))

export {apiRouter};
