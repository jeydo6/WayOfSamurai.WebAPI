import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import Logger from './core/Logger';
import { NotFoundError, ApiError, InternalError } from './core/ApiError';
import { corsUrl, environment } from './config';
import routes from './routes';

import './database';

process.on('uncaughtException', (e) => {
    Logger.error(e);
});

// process.on('unhandledRejection', (r, p) => {
//     Logger.error('unhandledRejection:', p, 'reason:', r);
// });

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

app.use('/', routes);

// catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction) => next(new NotFoundError()));

app.use((err: Error, _req: Request, res: Response) => {
    if (err instanceof ApiError) {
        ApiError.handle(err, res);
    } else {
        if (environment === 'development') {
            Logger.error(err);
            return res.status(500).send(err.message);
        }
        ApiError.handle(new InternalError(), res);
    }
});

export default app;
