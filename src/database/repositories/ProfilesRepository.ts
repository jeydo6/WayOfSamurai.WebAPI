import { Types } from 'mongoose';

import IUser from '../models/User';
import IProfile, { ProfileModel } from '../models/Profile';

export default class ProfilesRepository {
    public static async findById(id: Types.ObjectId): Promise<IProfile | null> {
        return await ProfileModel.findById(id)
            .select('+name +status +photo -posts')
            .lean<IProfile>();
    }

    public static async findByUserId(userId: Types.ObjectId): Promise<IProfile | null> {
        const user = { _id: userId } as IUser;

        return await ProfileModel.findOne({ user: user })
            .select('+name +status +photo -posts')
            .lean<IProfile>();
    }

    public static async create(profile: IProfile): Promise<IProfile> {
        return await ProfileModel.create(profile);
    }
}
