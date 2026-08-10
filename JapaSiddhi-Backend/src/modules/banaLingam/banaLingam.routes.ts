import {
  Router,
} from 'express';

import banaLingamController from './banaLingam.controller';

import authenticate from '../../middleware/auth.middleware';

const router = Router();

router.post(
  '/',
  authenticate,
  banaLingamController.create,
);

router.get(
  '/',
  authenticate,
  banaLingamController.getMyRequests,
);

router.get(
  '/:id',
  authenticate,
  banaLingamController.getById,
);

router.put(
  '/:id/status',
  authenticate,
  banaLingamController.updateStatus,
);

export default router;