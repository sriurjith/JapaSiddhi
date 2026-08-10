import { Request, Response } from 'express';

import userExcel from './userExcel';
import donationExcel from './donationExcel';
import orderExcel from './orderExcel';
import challengeExcel from './challengeExcel';
import japaExcel from './japaExcel';
import festivalExcel from './festivalExcel';
import customerCareExcel from './customerCareExcel';

class ExcelService {

  async userExcel(
    req: Request,
    res: Response,
  ) {

    return userExcel(
      req,
      res,
    );

  }

  async donationExcel(
    req: Request,
    res: Response,
  ) {

    return donationExcel(
      req,
      res,
    );

  }

  async orderExcel(
    req: Request,
    res: Response,
  ) {

    return orderExcel(
      req,
      res,
    );

  }

  async challengeExcel(
    req: Request,
    res: Response,
  ) {

    return challengeExcel(
      req,
      res,
    );

  }
    async japaExcel(
    req: Request,
    res: Response,
  ) {

    return japaExcel(
      req,
      res,
    );

  }

  async festivalExcel(
    req: Request,
    res: Response,
  ) {

    return festivalExcel(
      req,
      res,
    );

  }

  async customerCareExcel(
    req: Request,
    res: Response,
  ) {

    return customerCareExcel(
      req,
      res,
    );

  }

}

export default new ExcelService();