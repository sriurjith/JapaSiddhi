import {
  Request,
  Response,
  NextFunction,
} from 'express';

import donationService from './donation.service';

import apiResponse from '../../utils/apiResponse';



class DonationController {


  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const userId =
        req.user?.id;


      const result =
        await donationService.create(
          userId!,
          req.body,
        );


      return apiResponse.success(
        res,
        'Donation created successfully',
        result,
      );


    } catch(error) {

      next(error);

    }

  }



  async history(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const result =
        await donationService.getHistory(
          req.user!.id,
        );


      return apiResponse.success(
        res,
        'Donation history fetched successfully',
        result,
      );


    } catch(error) {

      next(error);

    }

  }



  async monthlyStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const result =
        await donationService.getMonthlyStatus(
          req.user!.id,
        );


      return apiResponse.success(
        res,
        'Monthly donation status fetched successfully',
        result,
      );


    } catch(error) {

      next(error);

    }

  }



  async paymentDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    try {

      const result =
        await donationService.getPaymentDetails();


      return apiResponse.success(
        res,
        'Donation payment details fetched successfully',
        result,
      );


    } catch(error) {

      next(error);

    }

  }


}


export default new DonationController();