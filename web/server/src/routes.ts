import { Router } from 'express';
import multer from 'multer';

// config de upload
import uploadConfig from './config/upload';

// controllers
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
// obtendo a configuração do upload do multer
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images') ,OrphanagesController.create);

export default routes;