import { Request, Response, NextFunction } from 'express';

import authService from './auth.service';

import apiResponse from '../../utils/apiResponse';


class AuthController {


  async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const result =
        await authService.login(
          req.body,
          {
            deviceType:
              req.body.deviceType,

            deviceModel:
              req.body.deviceModel,

            deviceOs:
              req.body.deviceOs,

            appVersion:
              req.body.appVersion,
          },
        );


      return apiResponse.success(
        res,
        'Login successful',
        result,
      );


    } catch (error) {

      next(error);

    }

  }



  async completeProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {


      const userId =
        req.user?.id;


      if (!userId) {

        throw new Error(
          'Unauthorized user',
        );

      }



      await authService.completeProfile(
        userId,
        req.body,
      );



      return apiResponse.success(
        res,
        'Profile completed successfully',
      );


    } catch (error) {

      next(error);

    }

  }




  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {


      const userId =
        req.user?.id;



      if (!userId) {

        throw new Error(
          'Unauthorized user',
        );

      }



      const user =
        await authService.getProfile(
          userId,
        );



      return apiResponse.success(
        res,
        'Profile fetched successfully',
        user,
      );


    } catch (error) {

      next(error);

    }

  }

}


export default new AuthController();