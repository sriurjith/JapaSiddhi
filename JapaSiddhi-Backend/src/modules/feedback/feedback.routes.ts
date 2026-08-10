import {
  Router,
} from 'express';

import feedbackController from './feedback.controller';

import authenticate from '../../middleware/auth.middleware';

const router = Router();

router.post(
  '/',
  authenticate,
  feedbackController.create,
);

router.get(
  '/',
  authenticate,
  feedbackController.getMyFeedback,
);

router.get(
  '/all',
  authenticate,
  feedbackController.getAll,
);

router.get(
  '/:id',
  authenticate,
  feedbackController.getById,
);

export default router;