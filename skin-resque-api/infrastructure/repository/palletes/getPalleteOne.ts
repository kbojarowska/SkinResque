import { Palette } from '../../../domain/models/index.js';
import { IPalette } from '../../../domain/shared/index.js';
import DB from '../../database_abstraction/index.js';

export const getPalleteOne = async (id: string): Promise<IPalette | null> => {
    const result = await DB.find(Palette, {
        _id: id,
    });
    if (typeof result === typeof []) return !!result?.[0] ? result[0] : null;
    return null;
};
