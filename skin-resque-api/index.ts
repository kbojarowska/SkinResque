import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import Dba from './infrastructure/database_abstraction/Dba.mjs';
import Cosmetic from './domain/models/Cosmetic.js';
dotenv.config();

const DB = new Dba();

const server_params = {
    PORT: process.env.PORT || 3000,
};

export interface CosmeticDB {
    name: string;
    description: string;
    recipe?: string;
    ingredients: Array<string>;
}

const DB_DATA = {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || '27017',
    NAME: process.env.DB_NAME || 'skin-resque',
};

const app: Application = express();
app.listen(server_params.PORT, async () => {
    console.log(`Server running on port ${server_params.PORT}`);
    await DB.connect(DB_DATA.HOST, DB_DATA.PORT, DB_DATA.NAME);
    const res = await DB.find<CosmeticDB>(Cosmetic, { name: { "$regex": ".*silver.*" } });
    console.log(res);
});
