import { model } from 'mongoose';
import { PaletteSchema } from '../schemas/index.mjs';
import { PALETTES } from '../constants.mjs';

export default model(PALETTES, PaletteSchema);
