import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import nursingHomes from '../views/nursing_homes_view';
import * as Yup from 'yup';

import NursingHomes from '../models/NursingHomes';

export default {
    // listagem de lares
    async index(request: Request, response: Response) {
        const homesRepository = getRepository(NursingHomes);
        // relaciona lar com as imagens
        const nursinghomes = await homesRepository.find({
            relations: ['images']
        });

        return response.json(nursingHomes.renderMany(nursinghomes));
    },
    // listando lares a partir do id
    async show(request: Request, response: Response) {
        const {id} = request.params;

        const homesRepository = getRepository(NursingHomes);

        const nursinghome = await homesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(nursingHomes.render(nursinghome));
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
        
        const homesRepository = getRepository(NursingHomes);

        // obtendo as imagens e "instruindo" ao multer que é um array
        const requestImg = request.files as Express.Multer.File[];
        // percorrendo array de images
        const images = requestImg.map(image => {
            return { path: image.filename}
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        };

        // validações
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        })

        // verifica validação
        await schema.validate(data, {
            abortEarly: false, // retorna todos os erros
        })
    
        const nursinghome = homesRepository.create(data);
    
        await homesRepository.save(nursinghome);
    
        return response.status(201).json(nursinghome);
    }
}