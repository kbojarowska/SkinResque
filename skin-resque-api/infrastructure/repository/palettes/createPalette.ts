import { Palette } from '../../../domain/models';
import DB from '../../database_abstraction';

export const createPalette = async (name: string, colors: [String]) => {
    const paletteToInsert = new Palette({
        name,
        colors
    });
    return DB.insert(Palette, [paletteToInsert]);
};