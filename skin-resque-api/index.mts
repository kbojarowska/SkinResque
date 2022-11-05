import express, { Application } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const server_params = {
    PORT: process.env.PORT || 3000,
};

const app: Application = express();
app.listen(server_params.PORT, () => {
    console.log(`Server running on port ${server_params.PORT}`);
});
