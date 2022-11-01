import { model } from 'mongoose';
import { PaletteSchema } from '../schemas';
import { PALETTES } from '../shared/constatns.mjs';

export default model(PALETTES, PaletteSchema);
