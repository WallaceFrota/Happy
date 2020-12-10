import express from 'express';
// rotas
import routes from './routes';

import './database/connection';

const app = express();

app.use(express.json());

// utilizando rotas
app.use(routes);

app.listen(3333);