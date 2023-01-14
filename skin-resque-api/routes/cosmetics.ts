import { Router } from 'express';
import { isValidObjectId } from 'mongoose';
import * as yup from 'yup';
import { SKIN_TYPES } from '../domain/constants.js';
import { getCosmeticOne } from '../infrastructure/repository/cosmetics/getCosmeticOne.js';
import { getCosmeticsAll } from '../infrastructure/repository/cosmetics/getCosmeticsAll.js';
import { getCosmeticsRandom } from '../infrastructure/repository/cosmetics/getCosmeticsRandom.js';
import {
    badRequestError,
    notFoundError,
    serverExceptionError,
} from '../infrastructure/repository/shared.js';

const cosmetics = Router({ mergeParams: true });

cosmetics.get('/', async (req, res) => {
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
                    type: yup.string().oneOf(SKIN_TYPES),
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
                getCosmeticsAll(size, page, name, type).then(success =>
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

cosmetics.get('/random', async (req, res) => {
    try {
        const size = parseInt(req.query.size as string);

        yup.number()
            .defined()
            .positive()
            .moreThan(0)
            .lessThan(51)
            .integer()
            .validate(size)
            .then(_ => {
                getCosmeticsRandom(size).then(success => res.status(200).send(success));
            })
            .catch(err => {
                return res.status(400).send(badRequestError(err));
            });
    } catch (err) {
        res.status(500).send(serverExceptionError());
    }
});

cosmetics.get('/:id', async (req, res) => {
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
                getCosmeticOne(id).then(success => {
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

export default cosmetics;
