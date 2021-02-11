import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export default (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
};
