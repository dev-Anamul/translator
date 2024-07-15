import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import router from './routes';
import swaggerUi from 'swagger-ui-express';
import yml from 'yamljs';

// swagger documentation
const swaggerDocument = yml.load('swagger.yaml');

// env configuration
dotenv.config();

// initialize express
const app = express();

// Middlewares
app.use([express.json(), cors(), morgan('dev')]);

// health check
app.get('/health', (_req, res) => {
    res.status(200).json({ status: `${process.env.SERVICE_NAME} service is up` });
});

// docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api', router);

// 404 error handler
app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: 'Resource not found' });
});

// global error handler
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.log('Error: ', error);

    res.status(500).json({ message: error.message });
});

// export app
export default app;
