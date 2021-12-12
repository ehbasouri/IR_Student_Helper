import { UserType } from '../entities/user';
import {MakeUsersDb} from "../data-access/auth-db"

interface makeRegisterParams {
    userDb: MakeUsersDb;
}

export default function makeGetUserInfo ({ userDb }: makeRegisterParams) : (userInfo: UserType) => Promise<UserType> {
    return async function getUserInfo (userInfo: UserType): Promise<UserType> {
        if (!userInfo._id) {
            throw new Error("user not found");
        }
        return userDb.findById(userInfo._id)
    }
  } 