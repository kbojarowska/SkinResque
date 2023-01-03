import { User } from '../../../domain/models';
import DB from '../../database_abstraction';
import { UpdateReturns } from '../../database_abstraction/types';

export const removeSavedCosmetics = async (
    id: string,
    cosmeticId: string
): Promise<UpdateReturns> => {
    return DB.update(
        User,
        { _id: id },
        {
            // @ts-ignore
            $pull: { saved_cosmetics: { $eq: cosmeticId } },
        },
        { upsert: false }
    );
};
