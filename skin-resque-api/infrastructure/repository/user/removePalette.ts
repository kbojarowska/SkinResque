import { User } from '../../../domain/models/index.js';
import DB from '../../database_abstraction/index.js';
import { UpdateReturns } from '../../database_abstraction/types';

export const removePalette = async (id: string, paletteId: string): Promise<UpdateReturns> => {
    return DB.update(
        User,
        { _id: id },
        {
            // @ts-ignore
            $pull: { saved_palletes: paletteId },
        },
        { upsert: false }
    );
};
