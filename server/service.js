import express from 'express';
import bodyparser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import { downloadRouter } from './lib/routes';

const app = express();

app.use(compression());
app.use(helmet());

app.use(cors({credentials: true, origin: true}));

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use('/', downloadRouter);

export default app;