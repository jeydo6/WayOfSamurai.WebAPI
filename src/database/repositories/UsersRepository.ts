import { Types } from 'mongoose';

import IUser, { UserModel } from '../models/User';

export default class UsersRepository {
    public static async findById(id: Types.ObjectId): Promise<IUser | null> {
        return await UserModel.findById(id).select('+email').lean<IUser>();
    }

    public static async findByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({ email: email }).select('+email').lean<IUser>();
    }

    public static async getList(): Promise<IUser[]> {
        return await UserModel.find().select('+email').lean<IUser>();
    }

    public static async create(user: IUser): Promise<IUser> {
        return await UserModel.create(user);
    }
}
