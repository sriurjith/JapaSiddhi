import { Request, Response } from 'express';
import reportService from './report.service';
import excelService from './excel/excel.service';
import pdfService from './pdf/pdf.service';

class ReportController {

  async dashboardAnalytics(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.dashboardAnalytics();

    return res.json({
      success: true,
      data: result,
    });

  }

  async reportDashboard(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.reportDashboard();

    return res.json({
      success: true,
      data: result,
    });

  }

  async completeDashboard(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.completeDashboard();

    return res.json({
      success: true,
      data: result,
    });

  }

  async statistics(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.statistics();

    return res.json({
      success: true,
      data: result,
    });

  }

  async leaderboard(
    req: Request,
    res: Response,
  ) {

    const limit =
      Number(req.query.limit ?? 10);

    const result =
      await reportService.leaderboard(limit);

    return res.json({
      success: true,
      data: result,
    });

  }

  async userReport(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.userReport(
        req.query as any,
      );

    return res.json({
      success: true,
      data: result,
    });

  }

  async donationReport(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.donationReport(
        req.query as any,
      );

    return res.json({
      success: true,
      data: result,
    });

  }

  async orderReport(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.orderReport(
        req.query as any,
      );

    return res.json({
      success: true,
      data: result,
    });

  }

  async japaReport(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.japaReport(
        req.query as any,
      );

    return res.json({
      success: true,
      data: result,
    });

  }
    async challengeReport(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.challengeReport(
        req.query as any,
      );

    return res.json({
      success: true,
      data: result,
    });

  }

  async banaLingamReport(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.banaLingamReport(
        req.query as any,
      );

    return res.json({
      success: true,
      data: result,
    });

  }

  async customerCareReport(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.customerCareReport(
        req.query as any,
      );

    return res.json({
      success: true,
      data: result,
    });

  }

  async festivalReport(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.festivalReport(
        req.query as any,
      );

    return res.json({
      success: true,
      data: result,
    });

  }

  async dailyJapaGraph(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.dailyJapaGraph();

    return res.json({
      success: true,
      data: result,
    });

  }

  async monthlyDonationGraph(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.monthlyDonationGraph();

    return res.json({
      success: true,
      data: result,
    });

  }

  async monthlyUserRegistrationGraph(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.monthlyUserRegistrationGraph();

    return res.json({
      success: true,
      data: result,
    });

  }

  async orderStatusGraph(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.orderStatusGraph();

    return res.json({
      success: true,
      data: result,
    });

  }

  async donationTypeGraph(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.donationTypeGraph();

    return res.json({
      success: true,
      data: result,
    });

  }

  async challengeCompletionGraph(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.challengeCompletionGraph();

    return res.json({
      success: true,
      data: result,
    });

  }
    async topJapaUsers(
    req: Request,
    res: Response,
  ) {

    const limit =
      Number(req.query.limit ?? 10);

    const result =
      await reportService.topJapaUsers(limit);

    return res.json({
      success: true,
      data: result,
    });

  }

  async topDonors(
    req: Request,
    res: Response,
  ) {

    const limit =
      Number(req.query.limit ?? 10);

    const result =
      await reportService.topDonors(limit);

    return res.json({
      success: true,
      data: result,
    });

  }

  async mostChantedMantras(
    req: Request,
    res: Response,
  ) {

    const limit =
      Number(req.query.limit ?? 10);

    const result =
      await reportService.mostChantedMantras(limit);

    return res.json({
      success: true,
      data: result,
    });

  }

  async donationSummary(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.donationSummary();

    return res.json({
      success: true,
      data: result,
    });

  }

  async orderSummary(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.orderSummary();

    return res.json({
      success: true,
      data: result,
    });

  }

  async userGrowthSummary(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.userGrowthSummary();

    return res.json({
      success: true,
      data: result,
    });

  }

  async challengeRewardSummary(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.challengeRewardSummary();

    return res.json({
      success: true,
      data: result,
    });

  }

  async graphs(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.graphs();

    return res.json({
      success: true,
      data: result,
    });

  }

  async monthlyDashboardSummary(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.monthlyDashboardSummary();

    return res.json({
      success: true,
      data: result,
    });

  }

  async yearlyDashboardSummary(
    req: Request,
    res: Response,
  ) {

    const result =
      await reportService.yearlyDashboardSummary();

    return res.json({
      success: true,
      data: result,
    });

  }
    async exportUsersExcel(
    req: Request,
    res: Response,
  ) {

    await excelService.userExcel(
      req,
      res,
    );

  }

  async exportDonationsExcel(
    req: Request,
    res: Response,
  ) {

    await excelService.donationExcel(
      req,
      res,
    );

  }

  async exportOrdersExcel(
    req: Request,
    res: Response,
  ) {

    await excelService.orderExcel(
      req,
      res,
    );

  }

  async exportChallengesExcel(
    req: Request,
    res: Response,
  ) {

    await excelService.challengeExcel(
      req,
      res,
    );

  }

  async exportJapaExcel(
    req: Request,
    res: Response,
  ) {

    await excelService.japaExcel(
      req,
      res,
    );

  }

  async exportFestivalsExcel(
    req: Request,
    res: Response,
  ) {

    await excelService.festivalExcel(
      req,
      res,
    );

  }

  async exportCustomerCareExcel(
    req: Request,
    res: Response,
  ) {

    await excelService.customerCareExcel(
      req,
      res,
    );

  }

  async exportUsersPdf(
    req: Request,
    res: Response,
  ) {

    await pdfService.userPdf(
      req,
      res,
    );

  }

  async exportDonationsPdf(
    req: Request,
    res: Response,
  ) {

    await pdfService.donationPdf(
      req,
      res,
    );

  }

  async exportOrdersPdf(
    req: Request,
    res: Response,
  ) {

    await pdfService.orderPdf(
      req,
      res,
    );

  }

  async exportChallengesPdf(
    req: Request,
    res: Response,
  ) {

    await pdfService.challengePdf(
      req,
      res,
    );

  }

  async exportJapaPdf(
    req: Request,
    res: Response,
  ) {

    await pdfService.japaPdf(
      req,
      res,
    );

  }

  async exportFestivalsPdf(
    req: Request,
    res: Response,
  ) {

    await pdfService.festivalPdf(
      req,
      res,
    );

  }

  async exportCustomerCarePdf(
    req: Request,
    res: Response,
  ) {

    await pdfService.customerCarePdf(
      req,
      res,
    );

  }

}

export default new ReportController();