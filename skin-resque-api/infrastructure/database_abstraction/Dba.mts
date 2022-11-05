import mongoose from 'mongoose';

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
    ): Promise<Array<T> | Error> {
        const result = new Promise(
            (resolve: (value: Array<T>) => void, reject: (err: Error) => void) => {
                model.find(queryParams, undefined, queryOptions, function (err, docs) {
                    if (err) return reject(new Error(err.message));
                    return resolve(docs);
                });
            }
        );
        return result;
    }
}
