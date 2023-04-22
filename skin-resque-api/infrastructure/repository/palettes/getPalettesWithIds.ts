import DB from '../../database_abstraction/index.js';
import { Palette } from '../../../domain/models/index.js';
import { IPalette } from '../../../domain/shared/index.js';
import mongoose from 'mongoose';

export const getPalettesWithIds = async (ids:  Array<mongoose.Schema.Types.ObjectId>): Promise<IPalette[]> => {
    return DB.find(Palette, { '_id' : {$in: ids}});
};
