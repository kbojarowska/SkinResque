import DB from '../../database_abstraction/index.js';
import { Palette } from '../../../domain/models/index.js';
import { IPalette } from '../../../domain/shared/index.js';
import { FilterQuery } from 'mongoose';

export const getPaletteAll = async (
    size?: number,
    page?: number,
    name?: string,
): Promise<IPalette[]> => {
    const query: Partial<{
        name: FilterQuery<any>;
    }> = {};
    if (name)
        query['name'] = {
            $text: {
                $search: name,
            },
        };
    return DB.find(
        Palette,
        query,
        size && page
            ? {
                  skip: size && page ? size * (page - 1) : undefined,
                  limit: !!size ? size : undefined,
              }
            : {}
    );
};
