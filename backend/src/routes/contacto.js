import { Router } from 'express';
import { validateContacto } from '../middleware/validateContacto.js';
import { contactLimiter } from '../middleware/rateLimit.js';
import { postContacto } from '../controllers/contactoController.js';

const router = Router();

router.post('/', contactLimiter, validateContacto, postContacto);

export default router;
