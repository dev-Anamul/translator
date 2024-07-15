import mongoose from 'mongoose';
import { env } from './environments';

/**
 * Connect to MongoDB with retries
 * @param retryCount - number of retries
 * @returns void
 */
export const connectWithRetry = async (retryCount: number) => {
    // connect to MongoDB
    try {
        await mongoose.connect(env.DB_URL, {
            dbName: env.DB_NAME,
            authSource: 'admin',
            w: 'majority',
            retryWrites: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(`Failed to connect to MongoDB: ${error}`);
        if (retryCount > 0) {
            console.log(`Retrying connection (${retryCount} retries left)...`);
            setTimeout(async () => {
                await connectWithRetry(retryCount - 1);
            }, 2000);
        } else {
            console.error('Max retries reached. Exiting...');
            process.exit(1);
        }
    }
};
