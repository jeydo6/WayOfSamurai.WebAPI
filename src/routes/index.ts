import express from 'express';

import usersRouter from './users';
import profilesRouter from './profiles';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/profiles', profilesRouter);

export default router;
