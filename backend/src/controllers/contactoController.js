import { sendContactEmail } from '../services/mailer.js';

export async function postContacto(req, res, next) {
  try {
    const result = await sendContactEmail(req.body);
    res.status(200).json({ ok: true, delivered: result.delivered });
  } catch (err) {
    next(err);
  }
}
