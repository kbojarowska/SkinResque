import { ObjectId } from 'mongoose';

export interface PalleteFromDB {
    _id: ObjectId;
    name: String;
    colors: String[];
}
