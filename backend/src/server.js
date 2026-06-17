import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';
import app from './app.js';
import { config } from './config/env.js';

const { port, sslDir } = config;

if (sslDir) {
  const key  = fs.readFileSync(path.join(sslDir, 'server.key'));
  const cert = fs.readFileSync(path.join(sslDir, 'certificate.crt'));
  const ca   = fs.readFileSync(path.join(sslDir, 'CABundle.crt'));

  https.createServer({ key, cert, ca }, app).listen(port, () => {
    console.log(`Connexa backend escuchando en https://localhost:${port}`);
  });
} else {
  http.createServer(app).listen(port, () => {
    console.log(`Connexa backend escuchando en http://localhost:${port}`);
  });
}
