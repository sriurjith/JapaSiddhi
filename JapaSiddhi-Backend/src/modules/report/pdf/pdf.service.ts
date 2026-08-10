import { Request, Response } from 'express';

import userPdf from './userPdf';
import donationPdf from './donationPdf';
import orderPdf from './orderPdf';
import challengePdf from './challengePdf';
import japaPdf from './japaPdf';
import festivalPdf from './festivalPdf';
import customerCarePdf from './customerCarePdf';

class PdfService {

  async userPdf(
    req: Request,
    res: Response,
  ) {

    return userPdf(
      req,
      res,
    );

  }

  async donationPdf(
    req: Request,
    res: Response,
  ) {

    return donationPdf(
      req,
      res,
    );

  }

  async orderPdf(
    req: Request,
    res: Response,
  ) {

    return orderPdf(
      req,
      res,
    );

  }

  async challengePdf(
    req: Request,
    res: Response,
  ) {

    return challengePdf(
      req,
      res,
    );

  }

  async japaPdf(
    req: Request,
    res: Response,
  ) {

    return japaPdf(
      req,
      res,
    );

  }

  async festivalPdf(
    req: Request,
    res: Response,
  ) {

    return festivalPdf(
      req,
      res,
    );

  }

  async customerCarePdf(
    req: Request,
    res: Response,
  ) {

    return customerCarePdf(
      req,
      res,
    );

  }

}

export default new PdfService();