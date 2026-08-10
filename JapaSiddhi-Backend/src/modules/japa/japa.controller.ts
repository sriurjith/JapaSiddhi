import {
  Request,
  Response,
  NextFunction,
} from 'express';

import japaService from './japa.service';

import apiResponse from '../../utils/apiResponse';



class JapaController {


  async createSession(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const userId =
        req.user?.id;


      if (!userId) {

        return apiResponse.error(
          res,
          'User not authenticated',
          401,
        );

      }


      const result =
        await japaService.createSession(
          userId,
          req.body,
        );


      return apiResponse.success(
        res,
        'Japa session completed successfully',
        result,
      );


    } catch (error) {

      next(error);

    }

  }



  async validateTap(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const result =
        japaService.validateTapChant(
          req.body.expectedSeconds,
          req.body.actualSeconds,
        );


      return apiResponse.success(
        res,
        'Tap validation completed',
        result,
      );


    } catch(error) {

      next(error);

    }

  }




  async validateVoice(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const result =
        japaService.validateVoiceChant(
          req.body.matchPercentage,
        );


      return apiResponse.success(
        res,
        'Voice validation completed',
        result,
      );


    } catch(error) {

      next(error);

    }

  }



  async getSummary(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const userId =
        req.user?.id;


      if (!userId) {

        return apiResponse.error(
          res,
          'User not authenticated',
          401,
        );

      }


      const result =
        await japaService.getSummary(
          userId,
        );


      return apiResponse.success(
        res,
        'Japa summary fetched successfully',
        result,
      );


    } catch(error) {

      next(error);

    }

  }


}


export default new JapaController();