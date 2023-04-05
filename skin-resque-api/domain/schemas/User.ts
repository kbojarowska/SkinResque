import { Schema } from 'mongoose';
import { USERS } from '../constants.js';
import { IUser } from '../shared/types.js';
import PaletteSchema from './Pallete.js';

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
		password: { type: String, required: true},
		token: { type: String },
        profile_picture: String,
        skin_type: String,
        saved_cosmetics: [{ type: Schema.Types.ObjectId, ref: 'Cosmetic' }],
        saved_palettes: [PaletteSchema],
    },
    { collection: USERS }
);

export default UserSchema;
