import DB from '../../database_abstraction/index.js';
import { Palette } from '../../../domain/models/index.js';

export const createPalette = async (name: string, colors: [String]) => {
    const paletteToInsert = new Palette({
        name,
        colors
    });
    return DB.insert(Palette, [paletteToInsert]);
};