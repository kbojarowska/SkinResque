import { Schema } from 'mongoose';

export type hexColor = `#${string}`;
export type skinType = 'drySkin' | 'else';

export interface ICosmetics {
    name: string;
    description: string;
    recipe: Array<string>;
    ingredients: Array<string>;
    skinTypeRecommendation: Array<skinType>;
    photo?: string;
}

export interface IPalette {
    name: string;
    colors: Array<hexColor>;
}

export interface IUser {
    name: string;
    email: string;
    profile_picture: string;
    skin_type: null | skinType;
    saved_cosmetics: Array<Schema.Types.ObjectId>;
    saved_palettes: Array<string>;
}
