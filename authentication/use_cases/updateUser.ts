import {makeUser} from '../entities';
import { UserType } from '../entities/user';
import {MakeUsersDb} from "../data-access/auth-db"

interface makeUpdateUserParams {
    userDb: MakeUsersDb
}

export default function makeUpdateUser ({ userDb }: makeUpdateUserParams) : (userInfo: UserType) => Promise<UserType> {
    return async function updateUser (userInfo: UserType): Promise<UserType> {
      console.log("===== ", userInfo)
      if (!userInfo._id) {
        throw new Error('id is empty')
      }
      if (userInfo.password) {
        throw new Error('password is not allowd')
      }
      if (userInfo.email) {
        throw new Error('email is not allowd')
      }
      const exists = await userDb.findById(userInfo._id)
      if (!exists) {
        throw new Error("user not found");
      }
        const updatedUser = makeUser(JSON.parse(JSON.stringify({
          ...JSON.parse(JSON.stringify(exists)), ...userInfo
        })))

        return userDb.findByIdAndUpdate({
            id: userInfo._id, 
            userInfo: {
                firstName: updatedUser.getFirstName(),
                lastName: updatedUser.getLastName(),
                phone: updatedUser.getPhone(),
                mobile: updatedUser.getMobile(),
                address: updatedUser.getAddress(),
                username: updatedUser.getUsername(),
                bankAccount: updatedUser.getBankAccount(),
                nationalId: updatedUser.getNationalId(),
                avatar: updatedUser.getAvatar()
            }
        })
    }
  } 