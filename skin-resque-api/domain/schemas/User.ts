import { Schema } from 'mongoose';
import { USERS } from '../constants.js';
import { IUser } from '../shared/types.js';

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
		password: { type: String, required: true},
		token: String,
		token_expiry_date: Date,
        profile_picture: Boolean,
        skin_type: String,
        saved_cosmetics: [{ type: Schema.Types.ObjectId, ref: 'Cosmetic' }],
        saved_palettes: [{ type: Schema.Types.ObjectId, ref: 'Palette' }],
    },
    { collection: USERS }
);

export default UserSchema;
