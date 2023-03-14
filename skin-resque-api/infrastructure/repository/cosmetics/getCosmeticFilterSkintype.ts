import { Cosmetic } from '../../../domain/models/index.js';
import { ICosmetics } from '../../../domain/shared/index.js';
import DB from '../../database_abstraction/index.js';

export const getCosmeticFilterSkintype = async (skintype: string): Promise<ICosmetics | null> => {
    const result = await DB.find(Cosmetic, {
        skinTypeRecomendation: skintype,
    });
    if (typeof result === typeof []) return !!result?.[0] ? result[0] : null;
    return null;
};
