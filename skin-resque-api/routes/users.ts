import { Router } from 'express';
import { getUserOne, deleteUser, removePalette, removeSavedCosmetics, removeProfilePicture } from '../infrastructure/repository/user/index.js';
import { IUser } from '../domain/shared';
import { isValidObjectId } from 'mongoose';
import {
    badRequestError,
    notFoundError,
    serverExceptionError,
} from '../infrastructure/repository/shared.js';
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
                    if (success.acknowledged === false) return res.status(404).send(notFoundError());
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
        console.log(err);
        res.status(500).send(serverExceptionError());
    }
});

users.post('/', async (req, res) => {});

users.post('/:id/palettes', async (req, res) => {});

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
                    if (success.acknowledged === false) return res.status(404).send(notFoundError());
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
                    if (success.acknowledged === false) return res.status(404).send(notFoundError());
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

export default users;
