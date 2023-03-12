import { Router } from 'express';
import { getUserOne } from '../infrastructure/repository/user/index.js';
import { IUser } from '../domain/shared';
import { isValidObjectId } from 'mongoose';
import {
    badRequestError,
    notFoundError,
    serverExceptionError,
} from '../infrastructure/repository/shared.js';
import { createUser } from '../infrastructure/repository/user/createUser.js';
import { getUserOneByUsernameOrEmail } from '../infrastructure/repository/user/getUserOne.js';
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

users.post('/', async (req, res) => {
	const body = req.body;

	yup.object({
		name: yup.string().required(),
		email: yup.string().email().required(),
		password: yup.string().min(8).max(32).required(),
		repeatedPassword: yup.string().min(8).max(32).oneOf([yup.ref('password'), null], 'Passwords must match').required()
	})
	.validate(body)
	.then(_ => {
		getUserOneByUsernameOrEmail(body.name, body.email)
		.then(result => {
			if (!!result) return createUser(body.name, body.email, body.password)
			.then(success => {
				if (!success) return res.status(404);
				res.status(200).send(success);
			})
			.catch(err => {
				return res.status(400).send(badRequestError(err));
			})
			res.status(404);
		})
		.catch(_ => {
			res.status(500).send(serverExceptionError());
		})
	})
	.catch(_ => {
		res.status(500).send(serverExceptionError());
	})
});

users.post('/:id/palettes', async (req, res) => {});

users.delete('/:id/palettes/:paletteId', async (req, res) => {});

users.post('/:id/cosmetic', async (req, res) => {});

users.delete('/:id/cosmetics/:cosmeticId', async (req, res) => {});

export default users;
