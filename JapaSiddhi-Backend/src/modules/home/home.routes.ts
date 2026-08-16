import {Router} from 'express';
import HomeController from './home.controller';
import authenticate from '../../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, HomeController.getHome);

export default router;