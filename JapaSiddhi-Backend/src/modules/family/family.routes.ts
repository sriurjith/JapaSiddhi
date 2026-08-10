import { Router } from 'express';

import familyController from './family.controller';

import authenticate from '../../middleware/auth.middleware';



const router = Router();



router.post(
  '/',
  authenticate,
  familyController.createFamily,
);



router.post(
  '/search',
  authenticate,
  familyController.searchMember,
);



router.post(
  '/invite',
  authenticate,
  familyController.sendInvitation,
);



router.post(
  '/invite/:id/accept',
  authenticate,
  familyController.acceptInvitation,
);



router.get(
  '/',
  authenticate,
  familyController.getFamily,
);



export default router;