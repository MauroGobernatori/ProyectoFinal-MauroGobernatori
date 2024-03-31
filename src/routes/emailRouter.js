import { Router } from 'express';

import { sendEmail, newPassword } from '../controllers/emailController.js';

const router = Router();

router.post('/reset-password', sendEmail);

router.post('/new-password', newPassword)

export default router;