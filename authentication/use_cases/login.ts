import makeUser from '../entities';
import { UserType } from '../entities/user';
import {MakeUsersDb} from "../data-access/auth-db"

interface makeRegisterParams {
    userDb: MakeUsersDb;
    compareSync(password: string, hashedPassword: string): boolean;
}

export default function makeLogin ({ userDb, compareSync }: makeRegisterParams) : (userInfo: UserType) => Promise<UserType> {
    return async function login (userInfo: UserType): Promise<UserType> {
        if(!userInfo.email){
            throw new Error("email is empty");
        }
        if(!userInfo.password){
            throw new Error("password is empty");
        }
        const existing = await userDb.findOne({ email: userInfo.email })

        if (!existing) {
            throw new RangeError('User not found.')
        }
        const newUser = makeUser(existing)

        if(!compareSync(userInfo.password, newUser.getPassword())){
            throw new RangeError('Password mismatch.')
        }

        return existing;
    }
  } 