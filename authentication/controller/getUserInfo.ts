import { UserType } from "../entities/user";
import { Controller, HttpRequest } from "../express-callback";

interface makeRegisterParams {
    getUser: (userInfo: UserType) => Promise<UserType>
    authenticateJWT(token: string): UserType | undefined;
    jwtCreation(data: any): string
}

export default function makeGetUserInfo ({ getUser, authenticateJWT, jwtCreation }: makeRegisterParams) :(httpRequest: HttpRequest) => Promise<Controller>{    
    return async function getUserInfo (httpRequest: HttpRequest) : Promise<Controller> {
        
        try {
            if(!httpRequest.authorization){
                throw new Error("unAuthorized");
            }
            const userInfo = authenticateJWT(httpRequest.authorization)
            if(!userInfo){
                throw new Error("unAuthorized");
            }
            const newUser = await getUser(userInfo)

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
  