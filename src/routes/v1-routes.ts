import { Router } from 'express';
import * as translateController from '../api';

const router = Router();

// translate text
router.post('/translator', translateController.translateHandler);

export default router;
