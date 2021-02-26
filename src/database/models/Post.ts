import { model, Schema, Document } from 'mongoose';

import ILike from './Like';
import IUser from './User';

export default interface IPost extends Document {
    text: string;

    author: IUser;

    likes: ILike[];
}

const schema = new Schema({
    text: {
        type: Schema.Types.String,
        required: true,
        trim: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Like',
        },
    ],
});

export const PostModel = model<IPost>('Post', schema, 'posts');
