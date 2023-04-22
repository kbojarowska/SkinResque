import { User } from '../../../domain/models/index.js';
import DB from '../../database_abstraction/index.js';
import { UpdateReturns } from '../../database_abstraction/types.js';

export const savePalette = async (id: string, paletteId: string): Promise<UpdateReturns> => {
    return DB.update(
        User,
        { _id: id },
        {
            // @ts-ignore
            $push: { saved_palettes: paletteId },
        },
        { upsert: false }
    );
};
