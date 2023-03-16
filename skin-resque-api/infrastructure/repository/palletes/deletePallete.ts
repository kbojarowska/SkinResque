import { Palette } from '../../../domain/models/index.js';
import DB from '../../database_abstraction/index.js';
import { DeleteReturns } from '../../database_abstraction/types';

export const deletePallete = async (id: string): Promise<DeleteReturns> => {
    return DB.delete(Palette, { _id: id });
};
