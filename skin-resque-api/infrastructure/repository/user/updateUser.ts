import { User } from '../../../domain/models';
import { skinType } from '../../../domain/shared/types';
import DB from '../../database_abstraction';
import { UpdateReturns } from '../../database_abstraction/types';

export const updateUser = async (
    id: string,
    email: string,
    login: string,
    skinType: skinType
): Promise<UpdateReturns> => {
    const update: Partial<Record<string, any>> = {};

    if (email) update.email = email;
    if (login) update.name = login;
    if (skinType) update.skin_type = skinType;

    const body = (await DB.find(User, { id }))?.[0] || {};

    return DB.update(User, { id }, { ...body, ...update }, { upsert: false });
};
