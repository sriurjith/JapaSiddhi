import {
  Request,
  Response,
  NextFunction,
} from 'express';

import feedbackService from './feedback.service';

import apiResponse from '../../utils/apiResponse';

class FeedbackController {

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

        rating,

        title,

        message,

      } = req.body;

      const result =
        await feedbackService.create(
          {
            userId,
            rating,
            title,
            message,
          },
        );

      return apiResponse.success(
        res,
        'Feedback submitted successfully',
        result,
      );

    } catch (error) {

      next(error);

    }

  }

  async getMyFeedback(
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
        await feedbackService.getUserFeedback(
          userId,
        );

      return apiResponse.success(
        res,
        'Feedback fetched successfully',
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
        await feedbackService.getById(
          Number(req.params.id),
        );

      return apiResponse.success(
        res,
        'Feedback fetched successfully',
        result,
      );

    } catch (error) {

      next(error);

    }

  }

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const result =
        await feedbackService.getAll();

      return apiResponse.success(
        res,
        'Feedback list fetched successfully',
        result,
      );

    } catch (error) {

      next(error);

    }

  }

}

export default new FeedbackController();