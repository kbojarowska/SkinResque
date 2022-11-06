import { model } from 'mongoose';
import { PaletteSchema } from '../schemas/index.js';
import { PALETTES } from '../constants.js';

export default model(PALETTES, PaletteSchema);
