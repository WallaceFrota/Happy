import multer from 'multer';
import path from 'path';

// config multer
export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, cb) => {
            // gerando novo nome de arquivo
            const fileName = `${Date.now()}-${file.originalname}`;

            // callback erro/resultado
            cb(null, fileName);
        }
    })
}