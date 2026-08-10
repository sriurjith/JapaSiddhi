import {
  Request,
  Response,
  NextFunction,
} from 'express';

import profileService from './profile.service';

import apiResponse from '../../utils/apiResponse';

class ProfileController {

  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const userId = req.user?.id;

      if (!userId) {

        return apiResponse.error(
          res,
          'User not authenticated',
          401,
        );

      }

      const result =
        await profileService.getProfile(
          userId,
        );

      if (!result) {

        return apiResponse.error(
          res,
          'Profile not found',
          404,
        );

      }

      return apiResponse.success(
        res,
        'Profile fetched successfully',
        result,
      );

    } catch (error) {

      next(error);

    }

  }



  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const userId = req.user?.id;

      if (!userId) {

        return apiResponse.error(
          res,
          'User not authenticated',
          401,
        );

      }

      const result =
        await profileService.updateProfile(
          userId,
          req.body,
        );

      return apiResponse.success(
        res,
        'Profile updated successfully',
        result,
      );

    } catch (error) {

      next(error);

    }

  }

}

export default new ProfileController();