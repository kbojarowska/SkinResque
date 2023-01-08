import DB from '../../database_abstraction/index.js';
import { ICosmetics } from '../../../domain/shared/types.js';
import { Cosmetic } from '../../../domain/models/index.js';

export const getCosmeticsRandom = async (size: number): Promise<ICosmetics[]> => {
    return DB.aggregate(Cosmetic, [{ $sample: { size } }]);
};
