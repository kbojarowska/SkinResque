import { Schema, Types } from 'mongoose';

export type hexColor = `#${string}`;
export type skinType = 'drySkin' | 'else';

export interface ICosmetics {
    name: string;
    description: string;
    recipe?: string;
    ingredients: Array<string>;
    skinTypeRecomendation: Array<skinType>;
    photo?: string;
}

export interface IPalette {
    name: string;
    colors: Array<hexColor>;
}

export interface IUser {
	_id: Types.ObjectId;
    name: string;
    email: string;
	password: string;
    profile_picture: string;
    skin_type: null | skinType;
    saved_cosmetics: Array<Schema.Types.ObjectId>;
    saved_palettes: Array<string>;
}
