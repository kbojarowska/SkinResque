import { model } from 'mongoose';
import { UserSchema } from '../schemas';
import { USERS } from '../shared/constatns.mjs';

export default model(USERS, UserSchema);
