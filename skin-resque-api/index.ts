import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import Dba from './infrastructure/database_abstraction/Dba.js';
import { Cosmetic, ICosmetics } from './domain/models/index.js';
dotenv.config();

const DB = new Dba();

const server_params = {
    PORT: process.env.PORT || 3000,
};

const DB_DATA = {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || '27017',
    NAME: process.env.DB_NAME || 'skin-resque',
};

const app: Application = express();
app.listen(server_params.PORT, async () => {
    console.log(`Server running on port ${server_params.PORT}`);
    await DB.connect(DB_DATA.HOST, DB_DATA.PORT, DB_DATA.NAME);
    const newCosmetic = new Cosmetic<ICosmetics>({
        name: "Cosmopolitanian Extraterrestial smoothening paste",
        description: "Not much",
        ingredients: []
    })
    

    const res = await DB.insert<ICosmetics>(Cosmetic, newCosmetic);
    console.log(res);
    
});
