import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import asyncHandler from '../helpers/asyncHandler';

import { SuccessResponse } from '../core/ApiResponse';
import { BadRequestError } from '../core/ApiError';

import UsersRepository from '../database/repositories/UsersRepository';
import IUser from '../database/models/User';

const router = express.Router();

router.get(
    '/',
    asyncHandler(async (_req: Request, res: Response) => {
        const users = await UsersRepository.getList();

        return new SuccessResponse('success', users).send(res);
    }),
);

router.get(
    '/:id',
    asyncHandler(async (req: Request, res: Response) => {
        const user = await UsersRepository.findById(new Types.ObjectId(req.params.id));

        if (!user) throw new BadRequestError('User not found!');

        return new SuccessResponse('success', user).send(res);
    }),
);

router.post(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const user = await UsersRepository.create(req.body as IUser);

        return new SuccessResponse('success', user).send(res);
    }),
);

export default router;
