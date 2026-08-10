import { Router } from 'express';

import authController from './auth.controller';

import {
  loginValidation,
  completeProfileValidation,
} from './auth.validation';

import validateRequest from '../../middleware/validateRequest';

import authMiddleware from '../../middleware/auth.middleware';


const router = Router();


// Firebase Login
router.post(
  '/login',
  loginValidation,
  validateRequest,
  authController.login,
);


// Complete Profile
router.put(
  '/complete-profile',
  authMiddleware,
  completeProfileValidation,
  validateRequest,
  authController.completeProfile,
);


// Get Current User Profile
router.get(
  '/profile',
  authMiddleware,
  authController.getProfile,
);


export default router;