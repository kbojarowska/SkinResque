import { Schema } from 'mongoose';
import { PALETTES } from '../constants.js';
import { IPallete } from '../shared/types.js';

const PaletteSchema = new Schema<IPallete>(
    {
        name: { type: String, required: true },
        colors: { type: [String], required: true },
    },
    { collection: PALETTES }
);

export default PaletteSchema;
