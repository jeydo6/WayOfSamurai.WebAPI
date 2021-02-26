import { model, Schema, Document } from 'mongoose';

import IPost from './Post';
import IUser from './User';

export default interface IProfile extends Document {
    name: string;

    status?: string;

    photo?: Buffer;

    user: IUser;

    posts: IPost[];
}

const schema = new Schema({
    name: {
        type: Schema.Types.String,
        trim: true,
    },
    status: {
        type: Schema.Types.String,
        trim: true,
    },
    photo: {
        type: Schema.Types.Buffer,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
        unique: true,
    },
    posts: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
    },
});

export const ProfileModel = model<IProfile>('Profile', schema, 'profiles');
