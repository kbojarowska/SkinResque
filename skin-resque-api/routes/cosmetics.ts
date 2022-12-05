import { Router } from 'express';
import * as yup from 'yup';
import { SKIN_TYPES } from '../domain/constants.js';
import { getCosmeticsAll } from '../infrastructure/repository/cosmetics/getCosmeticsAll.js';
import { badRequestError } from '../infrastructure/repository/shared.js';

const cosmetics = Router({ mergeParams: true });

cosmetics.get('/', async (req, res) => {
    try {
        const { size, page, name, type } = req.query;

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
                getCosmeticsAll(size, page, name, type).then(success => {
                    res.status(200).send(success);
                });
            })
            .catch(err => {
                return res.status(400).send(badRequestError(err));
            });
    } catch (err) {
        res.sendStatus(500);
    }
});

cosmetics.get('/random', async (req, res) => {});

cosmetics.get('/:id', async (req, res) => {});

export default cosmetics;
