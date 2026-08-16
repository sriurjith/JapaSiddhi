import {Router} from 'express';
import mantraController from './mantra.controller';

const router = Router();

router.get('/', mantraController.list);

export default router;
