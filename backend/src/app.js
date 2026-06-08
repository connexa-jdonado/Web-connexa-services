import express from 'express';
import helmet from 'helmet';
import { corsMiddleware } from './middleware/cors.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import contactoRoutes from './routes/contacto.js';

const app = express();

app.use(helmet());
app.use(corsMiddleware);
app.use(express.json({ limit: '64kb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'connexa-backend' });
});

app.use('/api/contacto', contactoRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
