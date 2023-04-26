import { User } from '../../../domain/models/index.js';
import { skinType } from '../../../domain/shared/types.js';
import DB from '../../database_abstraction/index.js';
import { UpdateReturns } from '../../database_abstraction/types.js';

export const updateUser = async (
    id: string,
    email: string,
    name: string,
    profilePicture: Boolean,
    skinType: skinType
): Promise<UpdateReturns> => {
    const update: Partial<Record<string, any>> = {};

    if (email) update.email = email;
    if (name) update.name = name;
    if (profilePicture) update.profile_picture = profilePicture;
    if (skinType) update.skin_type = skinType;

    return DB.update(User, { _id: id }, { ...update }, { upsert: false });
};
