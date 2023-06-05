import { Schema } from 'mongoose';
import { USERS } from '../constants.js';
import { IUser } from '../shared/types.js';

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
		password: { type: String, required: true},
<<<<<<< HEAD
		access_token: String,
        refresh_token: String,
=======
		token: String,
>>>>>>> a5dc027238178f2cf7f892619d202294f2fe86aa
		token_expiry_date: Date,
        profile_picture: Boolean,
        skin_type: String,
        saved_cosmetics: [{ type: Schema.Types.ObjectId, ref: 'Cosmetic' }],
        saved_palettes: [{ type: Schema.Types.ObjectId, ref: 'Palette' }],
    },
    { collection: USERS }
);

export default UserSchema;
