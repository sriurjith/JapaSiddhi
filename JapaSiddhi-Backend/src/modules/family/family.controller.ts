import {
  Request,
  Response,
  NextFunction,
} from 'express';

import familyService from './family.service';

import apiResponse from '../../utils/apiResponse';



class FamilyController {


  async createFamily(
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
        await familyService.createFamily(
          userId,
          req.body,
        );


      return apiResponse.success(
        res,
        'Family created successfully',
        result,
      );


    } catch(error) {

      next(error);

    }

  }



  async searchMember(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {


      const result =
        await familyService.searchMember(
          req.body,
        );


      return apiResponse.success(
        res,
        'Member search completed',
        result,
      );


    } catch(error) {

      next(error);

    }

  }



  async sendInvitation(
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
        await familyService.sendInvitation(
          userId,
          req.body,
        );


      return apiResponse.success(
        res,
        'Family invitation sent successfully',
        result,
      );


    } catch(error) {

      next(error);

    }

  }



  async acceptInvitation(
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
        await familyService.acceptInvitation(
          Number(req.params.id),
          userId,
        );


      return apiResponse.success(
        res,
        'Family invitation accepted successfully',
        result,
      );


    } catch(error) {

      next(error);

    }

  }



  async getFamily(
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
        await familyService.getFamily(
          userId,
        );


      return apiResponse.success(
        res,
        'Family details fetched successfully',
        result,
      );


    } catch(error) {

      next(error);

    }

  }


}


export default new FamilyController();