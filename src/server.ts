import Logger from './core/Logger';
import { port } from './config';
import app from './app';

app.listen(port, () => {
    Logger.info(`server running in port: ${port}`);
}).on('error', (err) => Logger.error(err));
