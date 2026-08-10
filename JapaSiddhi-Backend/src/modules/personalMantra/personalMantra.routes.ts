import { Router } from 'express';

import personalMantraController from './personalMantra.controller';

import authenticate from '../../middleware/auth.middleware';


const router = Router();


router.post(
  '/',
  authenticate,
  personalMantraController.create,
);


router.get(
  '/',
  authenticate,
  personalMantraController.getAll,
);


router.get(
  '/:id',
  authenticate,
  personalMantraController.getById,
);


router.put(
  '/:id',
  authenticate,
  personalMantraController.update,
);


router.delete(
  '/:id',
  authenticate,
  personalMantraController.delete,
);


export default router;