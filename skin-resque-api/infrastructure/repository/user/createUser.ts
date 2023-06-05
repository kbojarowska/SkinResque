import * as dotenv from 'dotenv';
dotenv.config();
import { hash } from 'bcrypt';
<<<<<<< HEAD
=======
import jwt from 'jsonwebtoken';
>>>>>>> a5dc027238178f2cf7f892619d202294f2fe86aa
import DB from '../../database_abstraction/index.js';
import { User } from '../../../domain/models/index.js';

export const createUser = async (name: string, email: string, password: string) => {
    const hashedPassword = await hash(password, 10);
    const userToInsert = new User({
        name: name,
        email: email,
        password: hashedPassword,
    });

<<<<<<< HEAD
=======
	const token = jwt.sign(
        { user_id: userToInsert._id, email},
        process.env.ACCESS_TOKEN_KEY as string,
        {
            expiresIn: '1h'
        }
    );

	userToInsert.token = token;

>>>>>>> a5dc027238178f2cf7f892619d202294f2fe86aa
    return DB.insert(User, [userToInsert]);
};
