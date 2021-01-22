import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export default interface IUser extends Document {
    name: string;
    email?: string;
    password?: string;
    photo?: string;
    status?: boolean;
    createdAt?: Date;
}

const schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
        trim: true,
        select: false,
    },
    password: {
        type: Schema.Types.String,
        select: false,
    },
    photo: {
        type: Schema.Types.String,
        trim: true,
    },
    status: {
        type: Schema.Types.Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        required: true,
        select: false,
    },
});

export const UserModel = model<IUser>(DOCUMENT_NAME, schema, COLLECTION_NAME);
