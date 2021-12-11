import {
  login,
    register
  } from "../use_cases";
import { jwtCreation } from "./jwt.creation";
import makeLogin from "./login";
import notFound from './not-found'
import makeRegister from "./register";

const registerController = makeRegister({ addUser: register, jwtCreation })
const loginController = makeLogin({ getUser: login,jwtCreation })

const commentController = Object.freeze({
    registerController,
    notFound,
    loginController
}) 

export default commentController
export { registerController, notFound, loginController }
  