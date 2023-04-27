import DB from '../../database_abstraction/index.js';
import { ICosmetics } from '../../../domain/shared/types.js';
import { Cosmetic } from '../../../domain/models/index.js';
import mongoose from 'mongoose';

export const getCosmeticsWithIds = async (ids:  Array<mongoose.Schema.Types.ObjectId>): Promise<ICosmetics[]> => {
    return DB.find(Cosmetic, { '_id' : {$in: ids}});
};
