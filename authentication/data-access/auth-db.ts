import { Model, UpdateQuery } from "mongoose"
import { UserType } from "../entities/user"

export interface makeUsersDbParams {
  model: Model<any, {}, {}, {}>
}

interface UserFindOnde {
  email?: string;
}

export interface FindByIdAndUpdateParams {
  id: string;
  userInfo: UpdateQuery<UserType>
}

export interface MakeUsersDb {
  insert(userInfo: UserType): any;
  findOne(params: UserFindOnde) : any;
  findById(id: string): any;
  findByIdAndUpdate(data: FindByIdAndUpdateParams): any
}

export const makeUsersDb = ({ model }: makeUsersDbParams) : MakeUsersDb => {
  return Object.freeze({
    insert,
    findOne,
    findById,
    findByIdAndUpdate
  })
  function insert (userInfo: UserType): any {
    const newUser = new model(userInfo)
    return newUser.save();
  }
  async function findOne({email}: any) {
    return model.findOne({email}).populate("bankAccount")
  }

  async function findById(id: string) {
    return model.findById(id).populate("bankAccount")
  }

  async function findByIdAndUpdate({id, userInfo}: FindByIdAndUpdateParams) {
    return model.findByIdAndUpdate(id, userInfo);
  }
} 

