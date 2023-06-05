import { User } from '../../../domain/models/index.js';
import DB from '../../database_abstraction/index.js';
import { UpdateReturns } from '../../database_abstraction/types.js';

export const updateUserToken = async (
    id: string,
    token: string,
    token_expiry_date: Date,
): Promise<UpdateReturns> => {
    const update: Partial<Record<string, any>> = {
		token: token,
		token_expiry_date: token_expiry_date
	};

    return DB.update(User, { _id: id }, { ...update }, { upsert: false });
};
