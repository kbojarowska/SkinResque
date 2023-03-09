import { Schema } from 'mongoose';
import { COSMETICS } from '../constants.js';
import { ICosmetics } from '../shared/types.js';

const CosmeticSchema = new Schema<ICosmetics>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        recipe: String,
        ingredients: [String],
        skinTypeRecomendation: [String],
        photo: String,
    },
    { collection: COSMETICS }
);

export default CosmeticSchema;
