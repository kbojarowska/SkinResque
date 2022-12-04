import { Schema } from 'mongoose';
import { PALETTES } from '../constants.js';
import { IPalette } from '../shared/types.js';

const PaletteSchema = new Schema<IPalette>(
    {
        name: { type: String, required: true },
        colors: { type: [String], required: true },
    },
    { collection: PALETTES }
);

export default PaletteSchema;
