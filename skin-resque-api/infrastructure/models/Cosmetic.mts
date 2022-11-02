import { model } from 'mongoose';
import { CosmeticSchema } from '../schemas';
import { COSMETICS } from '../shared/constatns.mjs';

export default model(COSMETICS, CosmeticSchema);
