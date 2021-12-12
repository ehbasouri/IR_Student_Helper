import { Model } from "mongoose"
import { BankAccountType } from "../entities/bankAccount"

export interface makeBankAccountsDbParams {
  model: Model<any, {}, {}, {}>
}

interface BankAccountFindOnde {
  email?: string;
}

export interface FindByIdAndUpdateParams {
  id: string;
  bankAccountInfo: any
}

export interface MakeBankAccountsDb {
  insert(bankAccountInfo: BankAccountType): any;
  findOne(params: BankAccountFindOnde) : any;
  findById(id: string): any;
  findByIdAndUpdate(data: FindByIdAndUpdateParams): any
}

export const makeBankAccountsDb = ({ model }: makeBankAccountsDbParams) : MakeBankAccountsDb => {
  return Object.freeze({
    insert,
    findOne,
    findById,
    findByIdAndUpdate
  })
  function insert (bankAccountInfo: BankAccountType): any {
    const newBankAccount = new model(bankAccountInfo)
    return newBankAccount.save();
  }
  async function findOne({email}: any) {
    return model.findOne({email});
  }

  async function findById(id: string) {
    return model.findById(id);
  }

  async function findByIdAndUpdate({id, bankAccountInfo}: FindByIdAndUpdateParams) {
    return model.findByIdAndUpdate(id, bankAccountInfo);
  }
} 

