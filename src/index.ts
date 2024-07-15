import dotenv from 'dotenv';
import http from 'http';

// env configuration
dotenv.config();

// import app
import app from './app';
import { env } from './config/environments';

// create server
const server = http.createServer(app);

// define port
const port = env.PORT || 6001;

// main function
const main = async () => {
    try {
        server.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.log('Failed to start server: ', error);
    }
};

// run main function
main();
