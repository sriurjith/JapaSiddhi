import {
  Request,
  Response,
  NextFunction,
} from 'express';

import customerCareService from './customerCare.service';

import apiResponse from '../../utils/apiResponse';

class CustomerCareController {

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

      const {

        subject,

        message,

      } = req.body;

      const result =
        await customerCareService.create(
          {
            userId,
            subject,
            message,
          },
        );

      return apiResponse.success(
        res,
        'Support ticket created successfully',
        result,
      );

    } catch (error) {

      next(error);

    }

  }

  async getMyTickets(
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
        await customerCareService.getUserTickets(
          userId,
        );

      return apiResponse.success(
        res,
        'Support tickets fetched successfully',
        result,
      );

    } catch (error) {

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
        await customerCareService.getById(
          Number(req.params.id),
        );

      return apiResponse.success(
        res,
        'Support ticket fetched successfully',
        result,
      );

    } catch (error) {

      next(error);

    }

  }

  async reply(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const {

        reply,

        status,

      } = req.body;

      const result =
        await customerCareService.reply(
          Number(req.params.id),
          reply,
          status,
        );

      return apiResponse.success(
        res,
        'Support ticket updated successfully',
        result,
      );

    } catch (error) {

      next(error);

    }

  }

}

export default new CustomerCareController();