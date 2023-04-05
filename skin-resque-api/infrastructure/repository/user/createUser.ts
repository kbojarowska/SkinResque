import * as dotenv from 'dotenv';
dotenv.config();
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import DB from '../../database_abstraction/index.js';
import { User } from '../../../domain/models/index.js';

export const createUser = async (name: string, email: string, password: string) => {
    const hashedPassword = await hash(password, 10);
    const userToInsert = new User({
        name: name,
        email: email,
        password: hashedPassword,
    });

	const token = jwt.sign(
        { user_id: userToInsert._id, email},
        process.env.TOKEN_KEY as string,
        {
            expiresIn: '1h'
        }
    );

	userToInsert.token = token;
	
	console.log(userToInsert)

    return DB.insert(User, [userToInsert]);
};
