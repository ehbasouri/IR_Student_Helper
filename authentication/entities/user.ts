import { MakeSourceParams, MakeSourceType } from "./source"

interface BuildMakeUser{
    makeSource: (source: MakeSourceParams ) => MakeSourceType;
    encryptPassword(password: string): string;
    isValidEmail(email: string): boolean;
}

interface NationalID {
    nationalNumber: string;
    file: string;
}

export interface UserType {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    phone?: string;
    mobile?: string;
    address?: string;
    username?: string;
    bankAccount?: string[];
    nationalId?: NationalID;
    avatar?: string
    source: MakeSourceParams;
    _id?: string;
}

interface MakeUser {
    getFirstName(): string;
    getLastName(): string;
    getPhone(): string;
    getMobile(): string;
    getAddress(): string;
    getUsername(): string;
    getSource(): MakeSourceParams
    getEmail(): string
    getPassword(): string;
    getBankAccount(): string[];
    encrypPassword(): string;
    getNationalId(): NationalID | object;
    getAvatar(): string;

}

export default function buildMakeUser({makeSource, encryptPassword, isValidEmail}: BuildMakeUser) : (userType: UserType) => Readonly<MakeUser> {
    return function makeUser({
        firstName,
        lastName,
        email,
        password,
        phone,
        mobile,
        address,
        username,
        bankAccount,
        nationalId,
        avatar,
        source
    }: UserType): Readonly<MakeUser> {
        if (!email || !isValidEmail(email)) {
            throw new Error('email is wrong');
        }
        if (!password || password.length < 3) {
            throw new Error('password is wrong');
        }
        const validSource = makeSource(source)
        const hashedPassword = encryptPassword(password);

        return Object.freeze({
            getFirstName: () => firstName || "",
            getLastName: () => lastName || "",
            getEmail: () => email,
            getPassword: () => password,
            encrypPassword: () => hashedPassword,
            getPhone: () => phone || "",
            getMobile: () => mobile || "",
            getAddress: () => address || "",
            getUsername: () => username || "",
            getBankAccount: () => bankAccount || [],
            getNationalId: () => nationalId || {},
            getAvatar: () => avatar || "",
            getSource: () => ({
                ip: validSource.getIp(),
                browser: validSource.getBrowser(),
                referrer: validSource.getReferrer()
            })
        })
    }
}