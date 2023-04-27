import { hash } from 'bcrypt';
import { User } from '../../../domain/models/index.js';
import DB from '../../database_abstraction/index.js';
import { UpdateReturns } from '../../database_abstraction/types.js';

export const updateUserPassword = async (
    id: string,
    password: string
): Promise<UpdateReturns> => {
    const hashedPassword = await hash(password, 10);
    return DB.update(User, { _id: id }, { password: hashedPassword }, { upsert: false });
};
