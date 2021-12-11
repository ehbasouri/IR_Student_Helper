
function makeDecryption({bcrypt}: any) {
    return function encryptPassword (password: string) : string {
        if(!password)
            throw new Error("password is empty");
        return bcrypt.hashSync(password, 10)
        
    }
}

export {
    makeDecryption,
}