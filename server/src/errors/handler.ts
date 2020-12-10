import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
    [key: string]: string[];
}

// lida com erros
const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    // se é um erro de validação da instancia da classe ValidationError
    if(error instanceof ValidationError) {
        let errors: ValidationErrors = {};

        error.inner.forEach(err => {
            errors[err.path] = err.errors
        });

        return response.status(400).json({message: 'Validation fails', errors})
    }

    // para o dev mostra erro
    console.error(error);

    // para usuário que está consumindo a api
    return response.status(500).json({message: 'Internal Server Error'});
}

export default errorHandler;