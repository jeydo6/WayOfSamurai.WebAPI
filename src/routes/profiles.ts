import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import asyncHandler from '../helpers/asyncHandler';

import { SuccessResponse } from '../core/ApiResponse';
import { BadRequestError } from '../core/ApiError';

import ProfilesRepository from '../database/repositories/ProfilesRepository';
import IProfile from '../database/models/Profile';

const router = express.Router();

router.get(
    '/:id',
    asyncHandler(async (req: Request, res: Response) => {
        if (!req.params.id) throw new BadRequestError('ProfileID is empty');

        const profileId = new Types.ObjectId(req.params.id);
        const profile = await ProfilesRepository.findById(profileId);

        if (!profile) throw new BadRequestError('Profile not found!');

        return new SuccessResponse('success', profile).send(res);
    }),
);

router.post(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const profile = await ProfilesRepository.create(req.body as IProfile);

        if (!profile) throw new BadRequestError('Something went wrong...');

        return new SuccessResponse('success', profile).send(res);
    }),
);

export default router;
