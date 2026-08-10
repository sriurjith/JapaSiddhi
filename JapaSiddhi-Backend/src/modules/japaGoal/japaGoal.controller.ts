import {
  Request,
  Response,
  NextFunction,
} from 'express';

import japaGoalService from './japaGoal.service';

import apiResponse from '../../utils/apiResponse';



class JapaGoalController {


  async createGoal(
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
        await japaGoalService.createGoal(
          userId,
          req.body,
        );


      return apiResponse.success(
        res,
        'Japa goal created successfully',
        result,
      );


    } catch(error) {

      next(error);

    }

  }



  async getGoals(
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
        await japaGoalService.getGoals(
          userId,
        );


      return apiResponse.success(
        res,
        'Japa goals fetched successfully',
        result,
      );


    } catch(error) {

      next(error);

    }

  }



  async getGoal(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const userId =
        req.user?.id;


      const goalId =
        Number(req.params.id);


      const result =
        await japaGoalService.getGoal(
          goalId,
          userId!,
        );


      return apiResponse.success(
        res,
        'Japa goal fetched successfully',
        result,
      );


    } catch(error) {

      next(error);

    }

  }



  async updateStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const userId =
        req.user?.id;


      await japaGoalService.updateStatus(
        Number(req.params.id),
        userId!,
        req.body.status,
      );


      return apiResponse.success(
        res,
        'Japa goal updated successfully',
      );


    } catch(error) {

      next(error);

    }

  }



  async cancelGoal(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const userId =
        req.user?.id;


      await japaGoalService.cancelGoal(
        Number(req.params.id),
        userId!,
      );


      return apiResponse.success(
        res,
        'Japa goal cancelled successfully',
      );


    } catch(error) {

      next(error);

    }

  }


}


export default new JapaGoalController();