import { model, Schema, Document } from 'mongoose';

export default interface IUser extends Document {
    email: string;

    password?: string;
}

export const DOCUMENT_NAME = 'User';

export const COLLECTION_NAME = 'users';

const schema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: Schema.Types.String,
        select: false,
    },
});

export const UserModel = model<IUser>(DOCUMENT_NAME, schema, COLLECTION_NAME);
