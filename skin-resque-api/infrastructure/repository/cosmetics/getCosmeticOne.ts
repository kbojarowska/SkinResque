import { Cosmetic } from '../../../domain/models';
import { ICosmetics } from '../../../domain/shared';
import DB from '../../database_abstraction';

export const getCosmeticOne = async (id: string): Promise<ICosmetics | null> => {
    const result = await DB.find(Cosmetic, {
        _id: id,
    });
    if (typeof result === typeof []) return !!result?.[0] ? result[0] : null;
    return null;
};
