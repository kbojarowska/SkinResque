import { Router } from 'express';
import { getUserOne, deleteUser, removePalette, savePalette, saveCosmetics, removeSavedCosmetics, removeProfilePicture, updateUser } from '../infrastructure/repository/user/index.js';
import { getCosmeticOne } from '../infrastructure/repository/cosmetics/index.js';
import { getPaletteOne } from '../infrastructure/repository/palettes/index.js';
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
import { DeleteReturns, UpdateReturns } from '../infrastructure/database_abstraction/types.js';


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
					const result = req.query.palettes ? success[0].saved_palettes : req.query.cosmetics ? success[0].saved_cosmetics : success[0];
                    res.status(200).send(result);
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
    try {
        const { id } = req.params;
        const { email, login, profilePicture, skinType } = req.body;
        yup.string()
            .length(24)
            .test('isValidObjectId', 'Not a valid ObjectId', (value, context) => {
                return isValidObjectId(value);
            })
            .required()
            .validate(id)
            .then(_ => {
                updateUser(id, email, login, profilePicture, skinType).then((success: UpdateReturns) => {
                    if (!success.acknowledged) return res.status(404).send(notFoundError());
                    res.status(200).send(success);
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

users.delete('/:id', async (req, res) => {
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
                deleteUser(id).then((success: DeleteReturns) => {
                    if (!success.acknowledged) return res.status(404).send(notFoundError());
                    res.status(200).send(success);
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

users.delete('/profile-picture/:id', async (req, res) => {
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
                removeProfilePicture(id).then((success: UpdateReturns) => {
                    if (success.acknowledged === false) return res.status(404).send(notFoundError());
                    res.status(200).send(success);
                });
            })
            .catch(err => {
                return res.status(400).send(badRequestError(err));
            });
    } catch (err) {
        res.status(500).send(serverExceptionError());
    }
});

users.delete('/profile-picture/:id', async (req, res) => {
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
                removeProfilePicture(id).then((success: UpdateReturns) => {
                    if (!success.acknowledged) return res.status(404).send(notFoundError());
                    res.status(200).send(success);
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

users.post('/', async (req, res) => {
	const body = req.body;

	console.log(body)

	yup.object({
		username: yup.string().required(),
		email: yup.string().email().required(),
		password: yup.string().min(8).max(32).required(),
		repeatedPassword: yup.string().min(8).max(32).oneOf([yup.ref('password'), null], 'Passwords must match').required()
	})
	.validate(body)
	.then(_ => {
		getUserOneByUsernameOrEmail(body.username, body.email)
		.then(result => {
			if (result.length === 0) return createUser(body.username, body.email, body.password)
			.then(success => {
				if (!success) return res.status(404);
				res.status(200).send(success);
			})
			.catch(err => {
				return res.status(400).send(badRequestError(err));
			})
			res.status(400).send('USERNAME_OR_EMAIL_EXISTS');
		})
		.catch(_ => {
			res.status(500).send(serverExceptionError());
		})
	})
	.catch(_ => {
		res.status(500).send(serverExceptionError());
	})
});

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

users.delete('/:id/palettes/:paletteId', async (req, res) => {
    try {
        const { id, paletteId } = req.params;
        yup.string()
            .length(24)
            .test('isValidObjectId', 'Not a valid ObjectId', (value, context) => {
                return isValidObjectId(value);
            })
            .required()
            .validate(id)
            .then(_ => {
                removePalette(id, paletteId).then((success: UpdateReturns) => {
                    if (!success.acknowledged) return res.status(404).send(notFoundError());
                    res.status(200).send(success);
                });
            })
            .catch(err => {
                return res.status(400).send(badRequestError(err));
            });
    } catch (err) {
        res.status(500).send(serverExceptionError());
    }
});

users.post('/:id/cosmetic', async (req, res) => {});

users.delete('/:id/cosmetics/:cosmeticId', async (req, res) => {
    try {
        const { id, cosmeticId } = req.params;
        yup.string()
            .length(24)
            .test('isValidObjectId', 'Not a valid ObjectId', (value, context) => {
                return isValidObjectId(value);
            })
            .required()
            .validate(id)
            .then(_ => {
                removeSavedCosmetics(id, cosmeticId).then((success: UpdateReturns) => {
                    if (!success.acknowledged) return res.status(404).send(notFoundError());
                    res.status(200).send(success);
                });
            })
            .catch(err => {
                return res.status(400).send(badRequestError(err));
            });
    } catch (err) {
        res.status(500).send(serverExceptionError());
    }
});

export default users;
