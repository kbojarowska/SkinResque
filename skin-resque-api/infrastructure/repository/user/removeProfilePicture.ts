import { User } from '../../../domain/models/index.js';
import DB from '../../database_abstraction/index.js';
import { UpdateReturns } from '../../database_abstraction/types';

export const removeProfilePicture = async (id: string): Promise<UpdateReturns> => {
    return DB.update(
        User,
        { _id: id },
        {
            // @ts-ignore
            $set: { profile_picture: false },
        },
        { upsert: false }
    );
};
