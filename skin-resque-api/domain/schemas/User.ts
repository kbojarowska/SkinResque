import { Schema } from 'mongoose';
import { USERS } from '../constants.js';
import { IUser } from '../shared/types.js';
import CosmeticSchema from './Cosmetics.js';
import PaletteSchema from './Pallete.js';

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        skin_type: String,
        saved_cosmetics: [CosmeticSchema],
        saved_palletes: [PaletteSchema],
    },
    { collection: USERS }
);

export default UserSchema;
