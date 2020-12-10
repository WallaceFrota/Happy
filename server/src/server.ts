import express from 'express';
import path from 'path';
import cors from 'cors';
import 'express-async-errors';

// rotas
import routes from './routes';

import errorHandler from './errors/handler';

import './database/connection';

const app = express();

app.use(express.json());
app.use(cors());

// utilizando rotas
app.use(routes);
// arquivo estaticos
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

// erros
app.use(errorHandler);

app.listen(3333);