import { Router } from 'express';
import { getUserOne } from '../infrastructure/repository/user/index.js';
import { IUser } from '../domain/shared/types.js';
import { isValidObjectId } from 'mongoose';
import { compare } from 'bcrypt';
import {
    badRequestError,
    notFoundError,
    serverExceptionError,
} from '../infrastructure/repository/shared.js';
import * as yup from 'yup';
import { getUserOneByUsername } from '../infrastructure/repository/user/getUserOne.js';

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
        console.log(err);
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

users.post('/login', async (req, res) => {
	const body = req.body;

	yup.object({
		name: yup.string().required(),
		password: yup.string().min(8).max(32).required()
	})
	.validate(body)
	.then(_ => {
		getUserOneByUsername(body.name)
		.then((result: IUser[]) => {
			if (!!result) return res.status(404);

			compare(body.password, (result as IUser).password)
			.then(success => {
				res.status(200).send(success);
			})
			.catch(err => {
				return res.status(400).send(badRequestError(err));
			})
		})
		.catch(err => {
			return res.status(400).send(badRequestError(err));
		})
	})
	.catch(() => {
		res.status(500).send(serverExceptionError());
	});
})

users.post('/:id/palettes', async (req, res) => {});

users.delete('/:id/palettes/:paletteId', async (req, res) => {});

users.post('/:id/cosmetic', async (req, res) => {});

users.delete('/:id/cosmetics/:cosmeticId', async (req, res) => {});

export default users;
