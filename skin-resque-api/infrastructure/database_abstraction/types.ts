import { ObjectId } from "mongoose";

export interface UpdateReturns{
    modifiedCount: number,
    matchedCount: number,
    acknowledged: boolean,
    upsertedId: null | ObjectId,
    upsertedCount: 0 | 1
}

export interface DeleteReturns{
    acknowledged: boolean,
    deletedCount: number
}