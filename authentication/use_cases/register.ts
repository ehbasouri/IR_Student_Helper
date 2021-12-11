import makeUser from '../entities';
import { UserType } from '../entities/user';
import {MakeUsersDb} from "../data-access/auth-db"

interface makeRegisterParams {
    userDb: MakeUsersDb
}

export default function makeRegister ({ userDb }: makeRegisterParams) : (userInfo: UserType) => Promise<UserType> {
    return async function register (userInfo: UserType): Promise<UserType> {
      if (!userInfo.email) {
        throw new Error('email is empty')
      }
      if (!userInfo.password) {
        throw new Error('password is empty')
      }
      const exists = await userDb.findOne({ email: userInfo.email})
      if (exists) {
        throw new Error("user exist");
      }

      const newUser = makeUser(userInfo)
      return userDb.insert({
        email: newUser.getEmail(),
        source: newUser.getSource(),
        password: newUser.encrypPassword()
      })
    }
  } 