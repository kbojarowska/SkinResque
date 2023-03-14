import { User } from '../../../domain/models';
import DB from '../../database_abstraction';
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
