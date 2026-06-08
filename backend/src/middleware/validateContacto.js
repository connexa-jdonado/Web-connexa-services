const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContacto(req, res, next) {
  const { nombre, email } = req.body || {};
  const errors = [];

  if (!nombre || String(nombre).trim().length < 2) {
    errors.push('El nombre es obligatorio.');
  }
  if (!email || !EMAIL_RE.test(String(email).trim())) {
    errors.push('El email no es válido.');
  }

  if (errors.length) {
    return res.status(400).json({ error: 'Datos inválidos', detalles: errors });
  }

  req.body.nombre = String(nombre).trim();
  req.body.email = String(email).trim();
  if (req.body.mensaje) req.body.mensaje = String(req.body.mensaje).trim();
  if (req.body.empresa) req.body.empresa = String(req.body.empresa).trim();
  if (req.body.telefono) req.body.telefono = String(req.body.telefono).trim();
  if (req.body.servicio) req.body.servicio = String(req.body.servicio).trim();

  next();
}
