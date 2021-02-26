import { Types } from 'mongoose';

import IProfile, { ProfileModel } from '../models/Profile';

export default class ProfilesRepository {
    public static async findById(id: Types.ObjectId): Promise<IProfile | null> {
        return await ProfileModel.findById(id)
            .populate('user')
            .select('+name +status +photo')
            .lean<IProfile>();
    }

    public static async findByUserId(userId: Types.ObjectId): Promise<IProfile | null> {
        return await ProfileModel.findOne({ 'user._id': userId })
            .populate('user')
            .select('+name +status +photo')
            .lean<IProfile>();
    }

    public static async create(profile: IProfile): Promise<IProfile> {
        return await ProfileModel.create(profile);
    }
}
