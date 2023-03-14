import { Cosmetic } from '../../../domain/models/index.js';
import DB from '../../database_abstraction/index.js';
import { DeleteReturns } from '../../database_abstraction/types';

export const deleteCosmetic = async (id: string): Promise<DeleteReturns> => {
    return DB.delete(Cosmetic, { _id: id });
};
