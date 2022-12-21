import { User } from '../../../domain/models';
import DB from '../../database_abstraction';
import { UpdateReturns } from '../../database_abstraction/types';

export const removePalette = async (id: string, paletteId: string): Promise<UpdateReturns> => {
    return DB.update(
        User,
        { _id: id },
        {
            // @ts-ignore
            $pop: { saved_palletes: { _id: paletteId } },
        },
        { upsert: false }
    );
};
