import DB from '../../database_abstraction/index.js';
import { User } from '../../../domain/models/index.js';
import { IUser } from '../../../domain/shared/types.js';

export const getUserOne = (id: string): Promise<IUser[]> => {
    return DB.find(User, { _id: id });
};
