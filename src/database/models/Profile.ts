import { model, Schema, Document } from 'mongoose';

import IPost from './Post';

export default interface IProfile extends Document {
    status?: string;

    photo?: Buffer;

    posts?: IPost[];
}

export const DOCUMENT_NAME = 'Profile';

export const COLLECTION_NAME = 'profiles';

const schema = new Schema({
    status: {
        type: Schema.Types.String,
        trim: true,
    },
    photo: {
        type: Schema.Types.Buffer,
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

export const ProfileModel = model<IProfile>(DOCUMENT_NAME, schema, COLLECTION_NAME);
