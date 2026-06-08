import cors from 'cors';
import { config } from '../config/env.js';

// El frontend vive en otro servidor: se restringe el origen al dominio configurado.
export const corsMiddleware = cors({
  origin: config.frontendUrl,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
});
