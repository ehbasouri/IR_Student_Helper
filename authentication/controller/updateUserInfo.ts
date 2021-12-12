import { UserType } from "../entities/user";
import { Controller, HttpRequest } from "../express-callback";

interface makeUpdateUserParams {
    editUser: (userInfo: UserType) => Promise<UserType>
    jwtCreation(data: any): string;
    authenticateJWT(token: string): UserType | undefined;
}

export default function makeUpdateUser ({ editUser, jwtCreation, authenticateJWT }: makeUpdateUserParams) :(httpRequest: HttpRequest) => Promise<Controller>{    
    return async function updateUser (httpRequest: HttpRequest) : Promise<Controller> {
        
      try {

        if(!httpRequest.authorization){
            throw new Error("unAuthorized");
        }
        const userInfo  = authenticateJWT(httpRequest.authorization)
        if(!userInfo){
            throw new Error("unAuthorized");
        }

        const updatInfo = httpRequest.body

        const newUser = await editUser({
          _id: userInfo._id,
          ...updatInfo,
        })

        const user_info = JSON.parse(JSON.stringify(newUser));
        delete user_info.password;
        // const accessToken = jwtCreation(user_info);

        return {
          headers: {
            'Content-Type': 'application/json',
            'Last-Modified': new Date().toUTCString()
          },
          statusCode: 201,
          body: { user_info }
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
  