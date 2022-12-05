import DB from '../../database_abstraction/index.js';
import { ICosmetics, skinType } from '../../../domain/shared/types.js';
import { Cosmetic } from '../../../domain/models/index.js';
import { FilterQuery } from 'mongoose';

export const getCosmeticsAll = (
    size?: number,
    page?: number,
    name?: string,
    type?: skinType
): Promise<ICosmetics[]> => {
    console.log(typeof size, typeof page, typeof name, typeof type);

    const query: Partial<{
        name: FilterQuery<any>;
        skinTypeRecomendation: FilterQuery<any>;
    }> = {};
    if (name)
        query['name'] = {
            $text: {
                $search: name,
            },
        };
    if (type)
        query['skinTypeRecomendation'] = {
            $elemMatch: {
                $eq: type,
            },
        };

    return DB.find(
        Cosmetic,
        query,
        size && page
            ? {
                  skip: size && page ? size * (page - 1) : undefined,
                  limit: !!size ? size : undefined,
              }
            : {}
    );
};
