import {
  Request,
  Response,
  NextFunction,
} from 'express';

import personalMantraService from './personalMantra.service';

import apiResponse from '../../utils/apiResponse';



class PersonalMantraController {


  async create(
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
        await personalMantraService.create(
          userId,
          req.body,
        );


      return apiResponse.success(
        res,
        'Personal mantra created successfully',
        result,
      );


    } catch(error) {

      next(error);

    }

  }



  async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const userId =
        req.user?.id;


      const result =
        await personalMantraService.getAll(
          userId!,
        );


      return apiResponse.success(
        res,
        'Personal mantras fetched successfully',
        result,
      );


    } catch(error) {

      next(error);

    }

  }



  async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const result =
        await personalMantraService.getById(
          Number(req.params.id),
          req.user!.id,
        );


      return apiResponse.success(
        res,
        'Personal mantra fetched successfully',
        result,
      );


    } catch(error) {

      next(error);

    }

  }



  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      await personalMantraService.update(
        Number(req.params.id),
        req.user!.id,
        req.body,
      );


      return apiResponse.success(
        res,
        'Personal mantra updated successfully',
      );


    } catch(error) {

      next(error);

    }

  }



  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      await personalMantraService.delete(
        Number(req.params.id),
        req.user!.id,
      );


      return apiResponse.success(
        res,
        'Personal mantra deleted successfully',
      );


    } catch(error) {

      next(error);

    }

  }


}


export default new PersonalMantraController();