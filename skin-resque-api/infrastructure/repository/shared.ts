import { ValidationError } from 'yup';

export const badRequestError = (err: ValidationError) => ({
    name: 'Bad request',
    code: 1,
    details: err.errors,
});

export const notFoundError = () => ({
    name: 'Resource not found',
    code: 2,
});

export const serverExceptionError = () => ({
    name: 'Server exception occured',
    code: 3,
});
