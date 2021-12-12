import {
  addBankAccount,
  getUserInfo,
  login,
  register,
  updateUserInfo
} from "../use_cases";
import makeBankAccount from "./addBankAccount";
import makeGetUserInfo from "./getUserInfo";
import { authenticateJWT, jwtCreation } from "./jwt.creation";
import makeLogin from "./login";
import notFound from './not-found'
import makeRegister from "./register";
import makeUpdateUser from "./updateUserInfo";

const registerController = makeRegister({ addUser: register, jwtCreation })
const loginController = makeLogin({ getUser: login,jwtCreation })
const getUserInfoController = makeGetUserInfo({ getUser: getUserInfo, jwtCreation, authenticateJWT })
const updateUserInfoController = makeUpdateUser({editUser: updateUserInfo, jwtCreation, authenticateJWT})

const addBankAccountController = makeBankAccount({authenticateJWT, addBankAccount})

const authController = Object.freeze({
    registerController,
    notFound,
    loginController,
    getUserInfoController,
    updateUserInfoController,
    addBankAccountController
}) 

export default authController
export { 
  registerController, 
  notFound, 
  loginController, 
  getUserInfoController, 
  updateUserInfoController,
  addBankAccountController }
  