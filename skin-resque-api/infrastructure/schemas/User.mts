import { Schema } from 'mongoose';
import { USERS } from '../shared/constatns.mjs';
import CosmeticSchema from './Cosmetics.mjs';
import PaletteSchema from './Pallete.mjs';

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
