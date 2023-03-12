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
        yup.string()
            .length(24)
            .test('isValidObjectId', 'Not a valid ObjectId', (value, context) => {
                return isValidObjectId(value);
            })
            .required()
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
        res.status(500).send(serverExceptionError());
    }
});

users.put('/:id', async (req, res) => {
    // TODO - Finish
    try {
        yup.string()
            .length(24)
            .test('isValidObjectId', 'Not a valid ObjectId', (value, context) => {
                return isValidObjectId(value);
            })
            .required();
    } catch (err) {}
});

users.delete('/:id', async (req, res) => {});

users.post('/', async (req, res) => {});

users.patch('/:id/cosmetics/:cosmeticId', async (req, res) => {
	try {
        const { id, cosmeticId } = req.params;

        yup.object().shape(
			{
				id: yup.string()
				.length(24)
            	.test('isValidObjectId', 'Not a valid ObjectId', (value, context) => {
                return isValidObjectId(value)}),
				cosmeticId: yup.string()
				.length(24)
            	.test('isValidObjectId', 'Not a valid ObjectId', (value, context) => {
                return isValidObjectId(value)})
			})
            .validate(req.params)
            .then(_ => {
				Promise.all([getUserOne(id), getCosmeticOne(cosmeticId)]).then(success => {
					const allValuesNotNull = success.some(value => value !== null);

					if (allValuesNotNull) return saveCosmetics(id, cosmeticId).then(success => {
						res.status(200).send(success);
					})
					.catch(err => {
						res.status(400).send(err);
					})
					res.status(400).send(notFoundError());
				})
            })
            .catch(err => {
                return res.status(400).send(badRequestError(err));
            });
		 } catch (err) {
        res.status(500).send(serverExceptionError());
    }
});

users.patch('/:id/palettes/:paletteId', async (req, res) => {
	try {
        const { id, paletteId } = req.params;

        yup.object().shape(
			{
				id: yup.string()
				.length(24)
            	.test('isValidObjectId', 'Not a valid ObjectId', (value, context) => {
                return isValidObjectId(value)}),
				paletteId: yup.string()
				.length(24)
            	.test('isValidObjectId', 'Not a valid ObjectId', (value, context) => {
                return isValidObjectId(value)})
			})
            .validate(req.params)
            .then(_ => {
				Promise.all([getUserOne(id), getPaletteOne(paletteId)]).then(success => {
					const allValuesNotNull = success.some(value => value !== null);

					if (allValuesNotNull) return savePalette(id, paletteId).then(success => {
						res.status(200).send(success);
					})
					.catch(err => {
						res.status(400).send(err);
					})
					res.status(400).send(notFoundError());
				})
            })
            .catch(err => {
                return res.status(400).send(badRequestError(err));
            });
    } catch (err) {
        res.status(500).send(serverExceptionError());
    }
});

users.delete('/:id/palettes/:paletteId', async (req, res) => {});

users.post('/:id/cosmetic', async (req, res) => {});

users.delete('/:id/cosmetics/:cosmeticId', async (req, res) => {});

export default users;
