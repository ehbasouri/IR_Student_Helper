import { BankAccountType } from "../entities/bankAccount";
import { UserType } from "../entities/user";
import { Controller, HttpRequest } from "../express-callback";

interface makeBankAccountParams {
    addBankAccount: (bankAccountInfo: BankAccountType) => Promise<BankAccountType>;
    authenticateJWT(token: string): UserType | undefined;
}

export default function makeBankAccount ({ addBankAccount, authenticateJWT }: makeBankAccountParams) :(httpRequest: HttpRequest) => Promise<Controller>{    
    return async function BankmakeBankAccount (httpRequest: HttpRequest) : Promise<Controller> {
        
      try {
        const bankAccountInfo = httpRequest.body
        
        if(!httpRequest.authorization){
            throw new Error("unAuthorized");
        }
        const userInfo = authenticateJWT(httpRequest.authorization)
        if(!userInfo){
            throw new Error("unAuthorized");
        }
        const newBankAccount = await addBankAccount({
          ...bankAccountInfo,
          user_id: userInfo._id
        })

        return {
          headers: {
            'Content-Type': 'application/json',
            'Last-Modified': new Date().toUTCString()
          },
          statusCode: 201,
          body: { newBankAccount }
        }
      } catch (error: any) {
        // TODO: Error logging
        console.log("error :: ", error?.message)
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 400,
          body: {
            error : error?.message
          }
        }
      }
    }
  }
  