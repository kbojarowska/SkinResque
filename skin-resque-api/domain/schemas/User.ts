import { Schema } from 'mongoose';
import { USERS } from '../constants.mjs';
import CosmeticSchema from './Cosmetics.js';
import PaletteSchema from './Pallete.js';

const UserSchema = new Schema(
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
