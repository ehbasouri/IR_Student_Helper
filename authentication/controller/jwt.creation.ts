import jwt from "jsonwebtoken";

function jwtCreation(data: any) {
    return jwt.sign(data, "123!@#123!@#" ); 
}

export {
    jwtCreation
}