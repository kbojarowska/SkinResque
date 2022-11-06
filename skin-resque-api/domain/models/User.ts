import { model } from 'mongoose';
import { UserSchema } from '../schemas/index.js';
import { USERS } from '../constants.js';

export default model(USERS, UserSchema);
