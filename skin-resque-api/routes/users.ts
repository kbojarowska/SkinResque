import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { compare } from 'bcrypt';
import { isValidObjectId } from 'mongoose';
import { getUserOne, getUserOneByUsername, deleteUser, removePalette, savePalette, saveCosmetics, removeSavedCosmetics, removeProfilePicture, updateUser } from '../infrastructure/repository/user/index.js';
import { getCosmeticOne } from '../infrastructure/repository/cosmetics/index.js';
import { getPaletteOne } from '../infrastructure/repository/palettes/index.js';
import { IUser } from '../domain/shared/types.js';
import {
    badRequestError,
    notFoundError,
    serverExceptionError,
} from '../infrastructure/repository/shared.js';
import { createUser } from '../infrastructure/repository/user/createUser.js';
import { getUserOneByUsernameOrEmail } from '../infrastructure/repository/user/getUserOne.js';
import * as yup from 'yup';
import { DeleteReturns, UpdateReturns } from '../infrastructure/database_abstraction/types.js';
import fs from 'fs';

const users = Router({ mergeParams: true });
const usersProfilePictureDirectoryPath = './public/upload';

const authorization = (req: any, res: any, next: any) => {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token'];
  
    if (!token) {
      return res.status(403).send('Token is required for authentication');
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY as string);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send('Invalid Token');
    }
    return next();
};

const checkIfDirectoryExistsAndCreateIfNot = (directoryPath: fs.PathLike) => {
	if (!fs.existsSync(directoryPath)) {
		fs.mkdirSync(directoryPath);
	}
};

const removeProfilePictureFile = (id: string, callback: Function) => {
	const userProfilePicturePath = `${usersProfilePictureDirectoryPath}/${id}.jpg`;
	fs.unlink(userProfilePicturePath, err => {
		if (err) return console.log(err);
		callback();
	});
}

users.get('/:id', authorization, async (req, res) => {
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

users.put('/:id', authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const { email, name, profilePicture, skinType } = req.body;
        yup.string()
            .length(24)
            .test('isValidObjectId', 'Not a valid ObjectId', (value, context) => {
                return isValidObjectId(value);
            })
            .required()
            .validate(id)
            .then(_ => {
				if (profilePicture) {
					checkIfDirectoryExistsAndCreateIfNot('./public/upload');
					fs.writeFile(`./public/upload/${id}.jpg`, profilePicture, 'binary', function(error) {
						if (error) return res.status(500).send(serverExceptionError());
					})
				}
                updateUser(id, email, name, profilePicture ? true : false, skinType).then((success: UpdateReturns) => {
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

users.delete('/:id', authorization, async (req, res) => {
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

users.delete('/profile-picture/:id', authorization, async (req, res) => {
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
				removeProfilePictureFile(id, () => removeProfilePicture(id).then((success: UpdateReturns) => {
                    if (!success.acknowledged) return res.status(404).send(notFoundError());
                    res.status(200).send(success);
                }));
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
	.catch((err) => {
		res.status(400).send(badRequestError(err));
	})
});

users.post('/login', async (req, res) => {
	const body = req.body;

	yup.object({
		username: yup.string().required(),
		password: yup.string().min(8).max(32).required()
	})
	.validate(body)
	.then(_ => {
		getUserOneByUsername(body.username)
		.then((result) => {
			if (result.length === 0) return res.status(400).send("USER_DOES_NOT_EXIST");

            const user = result[0];
            
			compare(body.password, user.password)
			.then(passwordCorrect => {
                const token = jwt.sign(
                    { user_id: user._id, user },
                    process.env.TOKEN_KEY as string,
                    {
                        expiresIn: '1h'
                    }
                );
                user.token = token;

				console.log(token);

				console.log(user);
				res.status(200).send({ passwordCorrect: passwordCorrect, id: result[0]._id, access_token: token });
			})
			.catch(err => {
				res.status(400).send(badRequestError(err));
			})
		})
		.catch(err => {
			res.status(500).send(serverExceptionError());
		})
	})
	.catch(() => {
		res.status(500).send(serverExceptionError());
	});
})

users.patch('/:id/cosmetics/:cosmeticId', authorization, async (req, res) => {
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

users.patch('/:id/palettes/:paletteId', authorization, async (req, res) => {
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

users.delete('/:id/palettes/:paletteId', authorization, async (req, res) => {
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

users.delete('/:id/cosmetics/:cosmeticId', authorization, async (req, res) => {
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
