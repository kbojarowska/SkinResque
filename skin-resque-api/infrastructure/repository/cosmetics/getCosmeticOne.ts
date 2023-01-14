import { Cosmetic } from '../../../domain/models/index.js';
import { ICosmetics } from '../../../domain/shared/index.js';
import DB from '../../database_abstraction/index.js';

export const getCosmeticOne = async (id: string): Promise<ICosmetics | null> => {
    const result = await DB.find(Cosmetic, {
        _id: id,
    });
    if (typeof result === typeof []) return !!result?.[0] ? result[0] : null;
    return null;
};
