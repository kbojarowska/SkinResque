import { User } from '../../../domain/models/index.js';
import DB from '../../database_abstraction/index.js';
import { DeleteReturns } from '../../database_abstraction/types';

export const deleteUser = async (id: string): Promise<DeleteReturns> => {
    return DB.delete(User, { _id: id });
};
