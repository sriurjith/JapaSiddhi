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
      const userId = req.user?.id;

      if (!userId) {
        return apiResponse.error(res, 'User not authenticated', 401);
      }

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