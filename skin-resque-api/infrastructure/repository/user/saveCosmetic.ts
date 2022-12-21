import { User } from '../../../domain/models';
import DB from '../../database_abstraction';
import { UpdateReturns } from '../../database_abstraction/types';

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
