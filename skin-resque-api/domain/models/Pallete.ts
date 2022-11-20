import { model } from 'mongoose';
import { PaletteSchema } from '../schemas/index.js';
import { PALETTES } from '../constants.js';
import { IPallete } from '../shared/types.js';

export default model<IPallete>(PALETTES, PaletteSchema);
