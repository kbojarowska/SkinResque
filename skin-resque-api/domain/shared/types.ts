import { Schema, Types } from 'mongoose';

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
	_id: Types.ObjectId;
    name: string;
    email: string;
	password: string;
	access_token: string;
    refresh_token: string;
	token_expiry_date: Date;
    profile_picture: Boolean;
    skin_type: null | skinType;
    saved_cosmetics: Array<Schema.Types.ObjectId>;
    saved_palettes: Array<Schema.Types.ObjectId>;
}
