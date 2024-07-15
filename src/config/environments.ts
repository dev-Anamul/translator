import { z } from 'zod';

// environment variables schema
const envSchema = z.object({
    NODE_ENV: z.string(),
    PORT: z.string(),
    SERVICE_NAME: z.string(),

    // DATABASE
    DB_URL: z.string(),
    DB_NAME: z.string(),
});

// validate environment variables
const envVariables = envSchema.safeParse(process.env);

// if invalid, log error and exit
if (!envVariables.success) {
    console.error('Invalid environment variables:');
    console.error(envVariables.error);
    process.exit(1);
}

// export environment variables
export const env = envVariables.data;
