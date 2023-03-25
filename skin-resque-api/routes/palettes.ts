import { Router } from 'express';
import { isValidObjectId } from 'mongoose';
import * as yup from 'yup';
import { getPaletteOne, getPaletteAll, createPalette, deletePalette}  from '../infrastructure/repository/palettes/index.js';
import { DeleteReturns } from '../infrastructure/database_abstraction/types.js';
import {
    badRequestError,
    notFoundError,
    serverExceptionError,
} from '../infrastructure/repository/shared.js';


const palettes = Router({ mergeParams: true });

palettes.get('/', async (req, res) => {
    try {
        const { name, type } = req.query;
        const size = parseInt(req.query.size as string);
        const page = parseInt(req.query.page as string);

        Promise.all([
            yup
                .array()
                .when({
                    is: (val?: number[]) => !!val?.[0],
                    then: yup.array().of(yup.number().defined()),
                    otherwise: yup.array().of(
                        yup.number().test('notDefined', function (value?: number) {
                            return !value;
                        })
                    ),
                })
                .validate([size, page]),
            yup
                .object()
                .shape({
                    size: yup.number().min(1).max(50).integer(),
                    page: yup.number().min(0).integer(),
                    name: yup.string().min(0).max(100),
                })
                .validate({
                    size,
                    page,
                    name,
                    type,
                }),
        ])
            .then(_ => {
                // @ts-ignore
                getPaletteAll(size, page, name).then(success =>
                    res.status(200).send(success)
                );
            })
            .catch(err => {
                return res.status(400).send(badRequestError(err));
            });
    } catch (err) {
        res.status(500).send(serverExceptionError());
    }
});

palettes.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        yup.string()
            .defined()
            .length(24)
            .test(
                'isValidObjectId',
                'Invalid id',
                (val: string | undefined, ctx: yup.TestContext): boolean => {
                    return isValidObjectId(val);
                }
            )
            .validate(id)
            .then(_ => {
                getPaletteOne(id).then(success => {
                    if (!success) return res.status(404).send(notFoundError());
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

palettes.post('/', async (req, res) => {
	const body = req.body;

	yup.object({
		name: yup.string().required(),
		colors: yup.array().of(yup.string()).required()
	})
	.validate(body)
	.then(_ => {
		return createPalette(body.name, body.colors)
		.then((success) => {
			return res.status(200).send(success);
		})
		.catch(err => {
			return res.status(400).send(badRequestError(err));
		})
	})
	.catch(err => {
		return res.status(400).send(badRequestError(err));
	})
})

palettes.delete('/:id', async (req, res) => {
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
                deletePalette(id).then((success: DeleteReturns) => {
                    if (success.deletedCount === 0) return res.status(404).send(notFoundError());
                    res.status(200).send(success);
                });
            })
            .catch(err => {
                return res.status(400).send(badRequestError(err));
            });
    } catch (err) {
        res.status(500).send(serverExceptionError());
    }
})

export default palettes;
