import { model } from 'mongoose';
import { UserSchema } from '../schemas/index.mjs';
import { USERS } from '../constants.mjs';

export default model(USERS, UserSchema);
