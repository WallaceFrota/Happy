import { Request, Response} from 'express';

import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

export default {
    // listagem de orfanatos
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find();

        return response.json(orphanages);
    },
    // listando orfanato a partir do id
    async show(request: Request, response: Response) {
        const {id} = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id);

        return response.json(orphanage);
    },
    // criação de orfanatos
    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = request.body;
        
        const orphanagesRepository = getRepository(Orphanage);

        // obtendo as imagens e "instruindo" ao multer que é um array
        const requestImg = request.files as Express.Multer.File[];
        // percorrendo array de images
        const images = requestImg.map(image => {
            return { path: image.filename}
        })
    
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        });
    
        await orphanagesRepository.save(orphanage);
    
        return response.status(201).json(orphanage);
    }
}