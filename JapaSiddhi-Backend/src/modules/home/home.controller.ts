import {
  Request,
  Response,
  NextFunction,
} from 'express';

import homeService from './home.service';
import apiResponse from '../../utils/apiResponse';

class HomeController {
  async getHome(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      /**
       * TEMPORARY DEVELOPMENT MODE
       * Authentication is disabled, so use a fixed user ID.
       * Restore req.user?.id when login is enabled again.
       */
      const userId = 1;

      const data = await homeService.getHome(userId);

      return apiResponse.success(
        res,
        'Home data fetched successfully',
        data,
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new HomeController();