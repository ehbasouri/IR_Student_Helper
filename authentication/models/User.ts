import mongoose, { Model, Schema } from "mongoose";

// nationalId?: NationalID;
// source: MakeSourceParams;

const UserSchema :Schema<any, Model<any, any, any, any>, any> = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    mobile: {
        type: String
    },
    avatar: {
        type: String
    },
    bankAccount: [{
        type: Schema.Types.ObjectId,
        ref: "BankAccount"
    }],
    source: {
        type: Object
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: "updated_at"  } });


UserSchema.index({username: 'text', firstName: 'text'});

const User: Model< any, {}, {}, {}> = mongoose.model('User', UserSchema);

export default User;
