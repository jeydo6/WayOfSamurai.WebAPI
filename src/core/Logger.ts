import { createLogger, transports, format } from 'winston';
import fs from 'fs';
import path from 'path';
import DailyRotaterFile from 'winston-daily-rotate-file';

import { environment, logDirectory } from '../config';

let dir = logDirectory;
if (!dir) dir = path.resolve('logs');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const logLevel = environment === 'development' ? 'debug' : 'warn';

const options = {
    file: {
        level: logLevel,
        filename: dir + '/%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        timestamp: true,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        prettyPrint: true,
        json: true,
        maxSize: '20m',
        colorize: true,
        maxFiles: '14d',
    },
};

export default createLogger({
    transports: [
        new transports.Console({
            level: logLevel,
            format: format.combine(format.errors({ stack: true }), format.prettyPrint()),
        }),
    ],
    exceptionHandlers: [new DailyRotaterFile(options.file)],
    exitOnError: false,
});
