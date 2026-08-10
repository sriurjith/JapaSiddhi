import {
  Request,
  Response,
  NextFunction,
} from 'express';

import banaLingamService from './banaLingam.service';

import apiResponse from '../../utils/apiResponse';

class BanaLingamController {

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

        orderId,

        fullName,

        mobile,

        email,

        address,

        cityId,

        stateId,

        countryId,

        postalCode,

        gothram,

        nakshatram,

        quantity,

        remarks,

      } = req.body;

      const result =
        await banaLingamService.create(
          {
            userId,
            orderId,
            fullName,
            mobile,
            email,
            address,
            cityId,
            stateId,
            countryId,
            postalCode,
            gothram,
            nakshatram,
            quantity,
            remarks,
          },
        );

      return apiResponse.success(
        res,
        'Bana Lingam request created successfully',
        result,
      );

    } catch (error) {

      next(error);

    }

  }

  async getMyRequests(
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
        await banaLingamService.getUserRequests(
          userId,
        );

      return apiResponse.success(
        res,
        'Bana Lingam requests fetched successfully',
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
        await banaLingamService.getById(
          Number(req.params.id),
        );

      return apiResponse.success(
        res,
        'Bana Lingam request fetched successfully',
        result,
      );

    } catch (error) {

      next(error);

    }

  }

  async updateStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const {

        requestStatus,

        remarks,

      } = req.body;

      const result =
        await banaLingamService.updateStatus(
          Number(req.params.id),
          requestStatus,
          remarks,
        );

      return apiResponse.success(
        res,
        'Bana Lingam request updated successfully',
        result,
      );

    } catch (error) {

      next(error);

    }

  }

}

export default new BanaLingamController();