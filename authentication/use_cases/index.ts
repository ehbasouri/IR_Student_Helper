import makeRegister from './register'
import {makeUsersDb, makeBankAccountsDb} from '../data-access'
import User from '../models/User'
import bcrypt from "bcrypt";
import makeLogin from './login';
import makeGetUserInfo from './getUserInfo';
import BankAccount from '../models/BankAccount';
import makeAddBankAccount from './add.bankAccount';
import makeUpdateUser from './updateUser';

const userModel = makeUsersDb({model: User});
const bankAccountModel = makeBankAccountsDb({model: BankAccount});

const register = makeRegister({userDb: userModel})
const login = makeLogin({userDb: userModel, compareSync})
const getUserInfo = makeGetUserInfo({userDb: userModel})
const updateUserInfo = makeUpdateUser({userDb: userModel})

const addBankAccount = makeAddBankAccount({bankAccountDB: bankAccountModel})

const authService = Object.freeze({
  register,
  login,
  getUserInfo,
  updateUserInfo,
  addBankAccount
})

export default authService;
export { register, login, getUserInfo, addBankAccount, updateUserInfo }

function compareSync(password: string, hashedPassword: string) : boolean {
  return bcrypt.compareSync(password, hashedPassword);
}
