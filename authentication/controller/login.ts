import { UserType } from "../entities/user";
import { Controller, HttpRequest } from "../express-callback";

interface makeRegisterParams {
    getUser: (userInfo: UserType) => Promise<UserType>;
    jwtCreation(data: any): string;
}

export default function makeLogin ({ getUser, jwtCreation }: makeRegisterParams) :(httpRequest: HttpRequest) => Promise<Controller>{    
    return async function login (httpRequest: HttpRequest) : Promise<Controller> {
        
      try {
        const userInfo = httpRequest.body
        const source: any = {
            ip: null,
            browser: null,
            referrer: null 
        }
        source.ip = httpRequest.ip
        source.browser = httpRequest.headers['User-Agent']
        if (httpRequest.headers['Referer']) {
          source.referrer = httpRequest.headers['Referer']
        }
        const newUser = await getUser({
          ...userInfo,
          source
        })

        const user_info = JSON.parse(JSON.stringify(newUser));
        delete user_info.password;
        const accessToken = jwtCreation(user_info);

        return {
          headers: {
            'Content-Type': 'application/json',
            'Last-Modified': new Date().toUTCString()
          },
          statusCode: 201,
          body: { accessToken }
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
  