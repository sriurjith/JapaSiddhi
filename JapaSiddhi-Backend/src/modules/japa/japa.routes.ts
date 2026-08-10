import { Router } from 'express';

import japaController from './japa.controller';

import authenticate from '../../middleware/auth.middleware';


const router = Router();


router.post(
  '/session',
  authenticate,
  japaController.createSession,
);


router.post(
  '/validate/tap',
  authenticate,
  japaController.validateTap,
);


router.post(
  '/validate/voice',
  authenticate,
  japaController.validateVoice,
);


router.get(
  '/summary',
  authenticate,
  japaController.getSummary,
);


export default router;