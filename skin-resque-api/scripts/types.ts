import { ObjectId } from 'mongoose';

export interface CosmeticFromDB {
    _id: ObjectId;
    name: String;
    description: String;
    recipe: String;
    ingredients: String[];
}

export interface PalleteFromDB {
    _id: ObjectId;
    name: String;
    colors: String[];
}
