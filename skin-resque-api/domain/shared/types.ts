import { Schema } from 'mongoose';

export type hexColor = `#${string}`;
export type skinType = 'drySkin' | 'else';

export interface ICosmetics {
    name: string;
    description: string;
    recipe?: string;
    ingredients: Array<string>;
    skinTypeRecomendation: Array<skinType>;
}

export interface IPalette {
    name: string;
    colors: Array<hexColor>;
}

export interface IUser {
    name: string;
    email: string;
    skin_type: null | skinType;
    saved_cosmetics: Array<Schema.Types.ObjectId>;
    saved_palletes: Array<string>;
}
