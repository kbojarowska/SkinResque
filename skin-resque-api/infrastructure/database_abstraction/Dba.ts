import mongoose, { Types } from 'mongoose';
import { DeleteReturns, UpdateReturns } from './types';

export default class Dba {
    public connect = async (host: string, port: number | string, dbName: string): Promise<void> => {
        await mongoose.connect(`mongodb://${host}:${port}`, { dbName: dbName }).catch(err => {
            console.log(err);
        });
    };

    public async find<T>(
        model: mongoose.Model<T>,
        queryParams: mongoose.FilterQuery<T>,
        queryOptions?: mongoose.QueryOptions
    ): Promise<Array<T>> {
        return new Promise((resolve: (value: Array<T>) => void, reject: (err: Error) => void) => {
            model.find(queryParams, undefined, queryOptions, function (err, docs) {
                if (err) return reject(new Error(err.message));
                return resolve(docs);
            });
        });
    }

    public async update<T>(
        model: mongoose.Model<T>,
        queryParams: mongoose.FilterQuery<T>,
        // @ts-ignore
        update: Partial<T>,
        queryOptions?: mongoose.QueryOptions
    ): Promise<UpdateReturns> {
        return new Promise(
            (resolve: (value: UpdateReturns) => void, reject: (err: Error) => void) => {
                model.updateMany(queryParams, update, queryOptions, function (err, updateReturns) {
                    if (err) return reject(new Error(err.message));
                    return resolve(updateReturns);
                });
            }
        );
    }

    public async delete<T>(
        model: mongoose.Model<T>,
        queryParams: mongoose.FilterQuery<T>,
        queryOptions?: mongoose.QueryOptions
    ): Promise<DeleteReturns> {
        return new Promise(
            (resolve: (value: DeleteReturns) => void, reject: (err: Error) => void) => {
                // @ts-ignore error in type definitions; callback has returns argument
                model.deleteMany(queryParams, queryOptions, function (err, returns) {
                    if (err) return reject(new Error(err.message));
                    return resolve(returns);
                });
            }
        );
    }

    public async insert<T>(
        model: mongoose.Model<T>,
        docs: mongoose.Document<Types.ObjectId, any, T>
    ): Promise<{}> {
        return new Promise((resolve, reject) => {
            model.insertMany(docs, { ordered: false }, (err, res) => {
                if (err) return reject(new Error(err.message));
                return resolve(res);
            });
        });
    }

    public async aggregate<T>(
        model: mongoose.Model<T>,
        aggregatePipeline: mongoose.PipelineStage[],
        aggregateOptions?: mongoose.AggregateOptions
    ): Promise<Array<T>> {
        return new Promise((resolve: (value: Array<T>) => void, reject: (err: Error) => void) => {
            // @ts-ignore
            model.aggregate(aggregatePipeline, aggregateOptions, function (err, docs) {
                if (err) return reject(new Error(err.message));
                return resolve(docs);
            });
        });
    }
}
