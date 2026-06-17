import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 4000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5174',
  contactTo: process.env.CONTACT_TO || 'contacto@connexaservices.com',
  mail: {
    user: process.env.MAIL_USER || '',
    clientId: process.env.MAIL_CLIENT || '',
    clientSecret: process.env.MAIL_SECRET || '',
    refreshToken: process.env.MAIL_REFRESH_TOKEN || '',
  },
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'Connexa Web <no-reply@connexaservices.com>',
  },
};
