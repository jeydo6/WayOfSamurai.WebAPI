import { model, Schema, Document } from 'mongoose';

import IUser from './User';

export default interface ILike extends Document {
    value: number;

    author: IUser;
}

const schema = new Schema({
    value: {
        type: Schema.Types.Number,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
});

export const LikeModel = model<ILike>('Like', schema, 'likes');
