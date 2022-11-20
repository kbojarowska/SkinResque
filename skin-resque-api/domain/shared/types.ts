import { Schema } from 'mongoose';

type hexColor = `#${string}`;
type skinType = string;

export interface ICosmetics {
    name: string;
    description: string;
    recipe?: string;
    ingredients: Array<string>;
}

export interface IPallete {
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
