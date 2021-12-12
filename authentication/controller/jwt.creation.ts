import jwt from "jsonwebtoken";
import { UserType } from "../entities/user";

const SECRET_KEY = "123!@#123!@#" 

function jwtCreation(data: any) {
    return jwt.sign(data, SECRET_KEY); 
}

function authenticateJWT (authHeader: string): UserType | undefined {
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let user_info: any| UserType | undefined;
        jwt.verify(token, SECRET_KEY, (err, user) => { 
            if (err) {
                throw new Error("unAuthorized");
            }
            user_info = user;
        });
        return user_info;
    } else {
        throw new Error("unAuthorized");
    }
};

export {
    jwtCreation,
    authenticateJWT
}