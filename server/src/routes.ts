import { Router } from 'express';
import multer from 'multer';

// config de upload
import uploadConfig from './config/upload';

// controllers
import NursingHomesController from './controllers/NursingHomesController';

const routes = Router();
// obtendo a configuração do upload do multer
const upload = multer(uploadConfig);

routes.get('/nursinghomes', NursingHomesController.index);
routes.get('/nursinghomes/:id', NursingHomesController.show);
routes.post('/nursinghomes', upload.array('images') ,NursingHomesController.create);

export default routes;