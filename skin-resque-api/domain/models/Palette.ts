import { model } from 'mongoose';
import { PaletteSchema } from '../schemas/index.js';
import { PALETTES } from '../constants.js';
import { IPalette } from '../shared/types.js';

export default model<IPalette>(PALETTES, PaletteSchema);
