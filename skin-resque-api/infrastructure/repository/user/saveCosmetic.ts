import { User } from '../../../domain/models/index.js';
import DB from '../../database_abstraction/index.js';
import { UpdateReturns } from '../../database_abstraction/types.js';

export const saveCosmetics = async (id: string, cosmeticId: string): Promise<UpdateReturns> => {
    return DB.update(
        User,
        { _id: id },
        {
            // @ts-ignore
            $push: { saved_cosmetics: cosmeticId },
        },
        { upsert: false }
    );
};
