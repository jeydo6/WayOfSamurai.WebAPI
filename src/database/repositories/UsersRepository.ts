import { Types } from 'mongoose';

import IUser, { UserModel } from '../models/User';

export default class UsersRepository {
    public static findById(id: Types.ObjectId): Promise<IUser | null> {
        return UserModel.findById({ _id: id }).select('+email +password').lean<IUser>().exec();
    }

    public static findByEmail(email: string): Promise<IUser | null> {
        return UserModel.findOne({ email: email }).select('+email +password').lean<IUser>().exec();
    }

    public static getList(): Promise<IUser[]> {
        return UserModel.find({}).select('+email +password').lean<IUser>().exec();
    }

    public static async create(user: IUser): Promise<IUser> {
        return await UserModel.create(user);
    }
}
