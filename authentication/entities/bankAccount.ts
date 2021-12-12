export interface BankAccountType {
    file: string;
    acountNumber: string;
    cardNumber: string;
    ShebaNumber: string;
    user_id: string;
}

interface MakeBankAccount {
    getFile(): string;
    getAcountNumber(): string;
    getCardNumber(): string
    geShebaNumber(): string
    getUser_id(): string;
}

export default function buildMakeBankAccount() : (userType: BankAccountType) => Readonly<MakeBankAccount> {
    return function makeBankAccount({
        file,
        acountNumber,
        cardNumber,
        ShebaNumber,
        user_id,
    }: BankAccountType)  {
        return Object.freeze({
            getFile: () => file,
            getAcountNumber: () => acountNumber,
            getCardNumber: () => cardNumber,
            geShebaNumber: () => ShebaNumber,
            getUser_id: () => user_id
        })
    }
}