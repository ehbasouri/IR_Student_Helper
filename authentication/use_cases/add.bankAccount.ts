import {makeBankAccount} from '../entities';
import {MakeBankAccountsDb} from "../data-access/bankAccountDB"
import { BankAccountType } from '../entities/bankAccount';

interface makeBankAccountParams {
    bankAccountDB: MakeBankAccountsDb
}

export default function makeAddBankAccount ({ bankAccountDB }: makeBankAccountParams) : (info: BankAccountType) => Promise<BankAccountType> {
    return async function addBankAccount (info: BankAccountType): Promise<BankAccountType> {
      const newAccount = makeBankAccount(info);
      return bankAccountDB.insert({
        acountNumber: newAccount.getAcountNumber(),
        cardNumber: newAccount.getCardNumber(),
        ShebaNumber: newAccount.geShebaNumber(),
        file: newAccount.getFile(),
        user_id: newAccount.getUser_id()
      })
    }
  } 