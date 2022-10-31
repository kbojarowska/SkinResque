import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { User } from '../infrastructure/models';
dotenv.config();

const DB_DATA = {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || '27017',
};

(async () => {
    mongoose.connect(`mongodb://${DB_DATA.HOST}:${DB_DATA.PORT}`, { dbName: "skin-resque" })
        .then(v => {
            console.log("Connected to db");
        })
        .catch(err => {
            console.log(err);
        })
})();
