import { model } from 'mongoose';
import { UserSchema } from '../schemas/index.js';
import { USERS } from '../constants.js';
import { IUser } from '../shared/types.js';

export default model<IUser>(USERS, UserSchema);
