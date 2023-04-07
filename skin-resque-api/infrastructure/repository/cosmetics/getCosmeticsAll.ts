import DB from '../../database_abstraction/index.js';
import { ICosmetics, skinType } from '../../../domain/shared/types.js';
import { Cosmetic } from '../../../domain/models/index.js';
import { FilterQuery } from 'mongoose';

export const getCosmeticsAll = async (
    size?: number,
    page?: number,
    name?: string,
    type?: skinType
): Promise<ICosmetics[]> => {
    const query: Partial<{
        name: FilterQuery<any>;
        skinTypeRecommendation: FilterQuery<any>;
    }> = {};
    if (name)
        query['name'] = {
            $text: {
                $search: name,
            },
        };
    if (type)
        query['skinTypeRecommendation'] = {
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
