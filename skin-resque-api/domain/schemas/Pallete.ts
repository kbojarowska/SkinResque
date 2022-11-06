import { Schema } from 'mongoose';
import { PALETTES } from '../constants.js';

const PaletteSchema = new Schema(
    {
        name: { type: String, required: true },
        colors: { type: [String], required: true },
    },
    { collection: PALETTES }
);

export default PaletteSchema;
