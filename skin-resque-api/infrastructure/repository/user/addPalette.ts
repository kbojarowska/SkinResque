import { Palette, User } from '../../../domain/models';
import { IPalette } from '../../../domain/shared';
import DB from '../../database_abstraction';
import { UpdateReturns } from '../../database_abstraction/types';

export const addPalette = async (id: string, palette: IPalette): Promise<UpdateReturns> => {
    const paletteToAdd = new Palette(palette);

    return DB.update(
        User,
        { _id: id },
        {
            // @ts-ignore
            $push: { saved_palletes: paletteToAdd },
        },
        { upsert: false }
    );
};
