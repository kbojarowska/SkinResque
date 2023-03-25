import DB from '../../database_abstraction/index.js';
import { User } from '../../../domain/models/index.js';
import { hash } from 'bcrypt';

export const createUser = async (name: string, email: string, password: string) => {
    const hashedPassword = await hash(password, 10);
    const userToInsert = new User({
        name,
        email,
        hashedPassword,
    });
    return DB.insert(User, [userToInsert]);
};
