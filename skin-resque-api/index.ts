import express, { Application, json, urlencoded } from 'express';
import * as dotenv from 'dotenv';
import DB from './infrastructure/database_abstraction/index.js';
import users from './routes/users.js';
import cosmetics from './routes/cosmetics.js';

dotenv.config();

const server_params = {
    PORT: process.env.PORT || 5000,
};

const DB_DATA = {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || '27017',
    NAME: process.env.DB_NAME || 'skin-resque',
};

const app: Application = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});
app.use('/users', users);
app.use('/cosmetics', cosmetics);

app.listen(server_params.PORT, async () => {
    console.log(`Server running on port ${server_params.PORT}`);
    DB.connect(DB_DATA.HOST, DB_DATA.PORT, DB_DATA.NAME).then(success =>
        console.log('Connected with mongodb')
    );
});
