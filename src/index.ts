import express from 'express';
import * as http from 'http';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';

import {CommonRoutesConfig} from './common/common.routes.config';
import {UsersRoutes} from './users/users.routes.config';

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;

const routes: Array<CommonRoutesConfig> = [];
const debugLog = debug('app');

app.use(express.json());

app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({all: true})
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new UsersRoutes(app));

server.listen(port, () => {
  routes.forEach(route => {
    debugLog(`Routes configured for ${route.getName()}`);
  });

  console.log(`Server running at http://localhost:${port}`);
});
