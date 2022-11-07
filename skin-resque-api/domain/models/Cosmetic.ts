import { model } from 'mongoose';
import { CosmeticSchema } from '../schemas/index.js';
import { COSMETICS } from '../constants.js';
import { ICosmetics } from './types.js';

export default model<ICosmetics>(COSMETICS, CosmeticSchema);
