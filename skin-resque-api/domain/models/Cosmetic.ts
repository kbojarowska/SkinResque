import { model } from 'mongoose';
import { CosmeticSchema } from '../schemas/index.mjs';
import { COSMETICS } from '../constants.mjs';

export default model(COSMETICS, CosmeticSchema);
