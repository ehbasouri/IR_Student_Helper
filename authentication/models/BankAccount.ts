import mongoose, { Model, Schema } from "mongoose";

const BankAccountSchema :Schema<any, Model<any, any, any, any>, any> = new mongoose.Schema({
    file: {
        type: String
    },
    acountNumber: {
        type: String
    },
    cardNumber: {
        type: String
    },
    ShebaNumber: {
        type: String
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: "updated_at"  } });

const BankAccount: Model< any, {}, {}, {}> = mongoose.model('BankAccount', BankAccountSchema);

export default BankAccount;
