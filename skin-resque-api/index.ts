import express, { Application, json, urlencoded } from 'express';
import * as dotenv from 'dotenv';
import DB from './infrastructure/database_abstraction/index.js';
import users from './routes/users.js';
import cosmetics from './routes/cosmetics.js';
import palettes from './routes/palettes.js';

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

app.use(json({
	limit: '20mb'
}));
app.use(urlencoded({ extended: true }));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});
app.use('/users', users);
app.use('/cosmetics', cosmetics);
app.use('/palettes', palettes);
app.use(express.static('public'));

app.listen(server_params.PORT, async () => {
    console.log(`Server running on port ${server_params.PORT}`);
    DB.connect(DB_DATA.HOST, DB_DATA.PORT, DB_DATA.NAME).then(success =>
        console.log('Connected with mongodb')
    );
});
