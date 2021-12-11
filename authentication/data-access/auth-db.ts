import { Model } from "mongoose"
import { UserType } from "../entities/user"

export interface makeUsersDbParams {
  model: Model<any, {}, {}, {}>
}

interface UserFindOnde {
  email?: string;
}

export interface MakeUsersDb {
  insert(userInfo: UserType): any;
  findOne(params: UserFindOnde) : any;
  findById(id: string): any
}

export const makeUsersDb = ({ model }: makeUsersDbParams) : MakeUsersDb => {
  return Object.freeze({
    insert,
    findOne,
    findById
  })
  function insert (userInfo: UserType): any {
    const newUser = new model(userInfo)
    return newUser.save()
  }
  async function findOne({email}: any) {
    return model.findOne({email})
  }

  async function findById(id: string) {
    return model.findById(id)
  }
} 

