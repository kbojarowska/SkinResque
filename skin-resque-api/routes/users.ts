import { Router } from 'express';
import { getUserOne } from '../infrastructure/repository/user/index.js';
import { IUser } from '../domain/shared';
import { isValidObjectId } from 'mongoose';
import {
    badRequestError,
    notFoundError,
    serverExceptionError,
} from '../infrastructure/repository/shared.js';
import * as yup from 'yup';

const users = Router({ mergeParams: true });

users.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const validationSchema = yup
            .string()
            .length(24)
            .test('isValidObjectId', 'Not a valid ObjectId', (value, context) => {
                return isValidObjectId(value);
            })
            .required();

        validationSchema
            .validate(id)
            .then(_ => {
                getUserOne(id).then((success: IUser[]) => {
                    if (success.length === 0) return res.status(404).send(notFoundError());
                    res.status(200).send(success[0]);
                });
            })
            .catch(err => {
                return res.status(400).send(badRequestError(err));
            });
    } catch (err) {
        console.log(err);
        res.status(500).send(serverExceptionError());
    }
});

users.put('/:id', async (req, res) => {});

users.delete('/:id', async (req, res) => {});

users.post('/', async (req, res) => {});

users.post('/:id/palettes', async (req, res) => {});

users.delete('/:id/palettes/:paletteId', async (req, res) => {});

users.post('/:id/cosmetic', async (req, res) => {});

users.delete('/:id/cosmetics/:cosmeticId', async (req, res) => {});

export default users;
