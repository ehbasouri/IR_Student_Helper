import makeRegister from './register'
import makeUserDb from '../data-access'
import User from '../models/User'
import bcrypt from "bcrypt";
import makeLogin from './login';

const userModel = makeUserDb({model: User});

const register = makeRegister({userDb: userModel})
const login = makeLogin({userDb: userModel, compareSync})

const authService = Object.freeze({
  register,
  login
})

export default authService;
export { register, login }

function compareSync(password: string, hashedPassword: string) : boolean {
  return bcrypt.compareSync(password, hashedPassword);
}
