import nodemailer from 'nodemailer';
import { config } from '../config/env.js';

let transporter = null;

function getTransporter() {
  if (!config.smtp.host) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined,
    });
  }
  return transporter;
}

export async function sendContactEmail({ nombre, email, empresa, telefono, servicio, mensaje }) {
  const tx = getTransporter();

  const text = [
    `Nombre: ${nombre}`,
    `Email: ${email}`,
    empresa ? `Empresa: ${empresa}` : null,
    telefono ? `Teléfono: ${telefono}` : null,
    servicio ? `Servicio de interés: ${servicio}` : null,
    '',
    'Mensaje:',
    mensaje || '(sin mensaje)',
  ].filter((l) => l !== null).join('\n');

  // Sin SMTP configurado: no se rompe el flujo, solo se registra.
  if (!tx) {
    console.log('[contacto] SMTP no configurado. Mensaje recibido:\n' + text);
    return { delivered: false };
  }

  await tx.sendMail({
    from: config.smtp.from,
    to: config.contactTo,
    replyTo: email,
    subject: `Nuevo contacto web — ${nombre}`,
    text,
  });

  return { delivered: true };
}
