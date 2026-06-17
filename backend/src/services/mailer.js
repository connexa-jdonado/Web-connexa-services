import { config } from '../config/env.js';

async function fetchAccessToken() {
  const { mail } = config;
  const body = new URLSearchParams({
    client_id: mail.clientId,
    client_secret: mail.clientSecret,
    refresh_token: mail.refreshToken,
    grant_type: 'refresh_token',
  });

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OAuth2 token refresh failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  return data.access_token;
}

// Builds a minimal RFC 2822 message and base64url-encodes it for the Gmail API.
function buildRawMessage({ from, to, replyTo, subject, text }) {
  const encSubject = `=?UTF-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const headers = [
    `From: ${from}`,
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${encSubject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
  ].join('\r\n');

  const encodedBody = Buffer.from(text).toString('base64');
  const raw = `${headers}\r\n\r\n${encodedBody}`;

  // Gmail API requires base64url (no +, /, or trailing =)
  return Buffer.from(raw).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sendViaGmailAPI({ from, to, replyTo, subject, text }) {
  const accessToken = await fetchAccessToken();
  const raw = buildRawMessage({ from, to, replyTo, subject, text });

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gmail API send failed (${res.status}): ${err}`);
  }

  return res.json();
}

// Fallback: SMTP via nodemailer (used when OAuth2 is not configured).
let smtpTransporter = null;

async function sendViaSMTP({ from, to, replyTo, subject, text }) {
  const { smtp } = config;
  if (!smtpTransporter) {
    const { default: nodemailer } = await import('nodemailer');
    smtpTransporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined,
    });
  }
  await smtpTransporter.sendMail({ from, to, replyTo, subject, text });
}

export async function sendContactEmail({ nombre, email, empresa, telefono, servicio, mensaje }) {
  const { mail, smtp, contactTo } = config;

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

  const mailOpts = {
    from: mail.refreshToken
      ? `Connexa Web <${mail.user}>`
      : smtp.from || 'Connexa Web <no-reply@connexaservices.com>',
    to: contactTo,
    replyTo: email,
    subject: `Nuevo contacto web — ${nombre}`,
    text,
  };

  if (mail.refreshToken) {
    await sendViaGmailAPI(mailOpts);
    return { delivered: true };
  }

  if (smtp.host) {
    await sendViaSMTP(mailOpts);
    return { delivered: true };
  }

  console.log('[contacto] Sin transporte configurado. Mensaje recibido:\n' + text);
  return { delivered: false };
}
