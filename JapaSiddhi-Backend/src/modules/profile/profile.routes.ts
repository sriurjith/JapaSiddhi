import { Router } from 'express';

import profileController from './profile.controller';

import authenticate from '../../middleware/auth.middleware';

import validateRequest from '../../middleware/validateRequest';

import {
  updateProfileValidation,
} from './profile.validation';

const router = Router();

router.get(
  '/',
  authenticate,
  profileController.getProfile,
);

router.put(
  '/',
  authenticate,
  updateProfileValidation,
  validateRequest,
  profileController.updateProfile,
);

export default router;