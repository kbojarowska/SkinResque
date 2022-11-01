import { Schema } from 'mongoose';
import { COSMETICS } from '../shared/constatns.mjs';

const CosmeticSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        recipe: String,
        ingredients: [String],
    },
    { collection: COSMETICS }
);

export default CosmeticSchema;
