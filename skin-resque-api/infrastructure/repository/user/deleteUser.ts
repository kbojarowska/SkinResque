import { User } from '../../../domain/models';
import DB from '../../database_abstraction';
import { DeleteReturns } from '../../database_abstraction/types';

export const deleteUser = async (id: string): Promise<DeleteReturns> => {
    return DB.delete(User, { id });
};
