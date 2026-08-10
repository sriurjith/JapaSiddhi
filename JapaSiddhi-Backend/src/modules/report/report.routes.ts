import { Router } from 'express';

import reportController from './report.controller';


  import authenticate from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get(
  '/dashboard',
  reportController.reportDashboard,
);

router.get(
  '/dashboard/complete',
  reportController.completeDashboard,
);

router.get(
  '/dashboard/analytics',
  reportController.dashboardAnalytics,
);

router.get(
  '/dashboard/statistics',
  reportController.statistics,
);

router.get(
  '/dashboard/leaderboard',
  reportController.leaderboard,
);

router.get(
  '/dashboard/monthly-summary',
  reportController.monthlyDashboardSummary,
);

router.get(
  '/dashboard/yearly-summary',
  reportController.yearlyDashboardSummary,
);

router.get(
  '/reports/users',
  reportController.userReport,
);

router.get(
  '/reports/donations',
  reportController.donationReport,
);

router.get(
  '/reports/orders',
  reportController.orderReport,
);

router.get(
  '/reports/japa',
  reportController.japaReport,
);

router.get(
  '/reports/challenges',
  reportController.challengeReport,
);
router.get(
  '/reports/bana-lingam',
  reportController.banaLingamReport,
);

router.get(
  '/reports/customer-care',
  reportController.customerCareReport,
);

router.get(
  '/reports/festivals',
  reportController.festivalReport,
);

router.get(
  '/graphs',
  reportController.graphs,
);

router.get(
  '/graphs/daily-japa',
  reportController.dailyJapaGraph,
);

router.get(
  '/graphs/monthly-donations',
  reportController.monthlyDonationGraph,
);

router.get(
  '/graphs/monthly-users',
  reportController.monthlyUserRegistrationGraph,
);

router.get(
  '/graphs/order-status',
  reportController.orderStatusGraph,
);

router.get(
  '/graphs/donation-types',
  reportController.donationTypeGraph,
);

router.get(
  '/graphs/challenge-completion',
  reportController.challengeCompletionGraph,
);

router.get(
  '/summary/top-japa-users',
  reportController.topJapaUsers,
);

router.get(
  '/summary/top-donors',
  reportController.topDonors,
);

router.get(
  '/summary/most-chanted-mantras',
  reportController.mostChantedMantras,
);

router.get(
  '/summary/donations',
  reportController.donationSummary,
);

router.get(
  '/summary/orders',
  reportController.orderSummary,
);

router.get(
  '/summary/user-growth',
  reportController.userGrowthSummary,
);

router.get(
  '/summary/challenge-rewards',
  reportController.challengeRewardSummary,
);
router.get(
  '/export/excel/users',
  reportController.exportUsersExcel,
);

router.get(
  '/export/excel/donations',
  reportController.exportDonationsExcel,
);

router.get(
  '/export/excel/orders',
  reportController.exportOrdersExcel,
);

router.get(
  '/export/excel/challenges',
  reportController.exportChallengesExcel,
);

router.get(
  '/export/excel/japa',
  reportController.exportJapaExcel,
);

router.get(
  '/export/excel/festivals',
  reportController.exportFestivalsExcel,
);

router.get(
  '/export/excel/customer-care',
  reportController.exportCustomerCareExcel,
);

router.get(
  '/export/pdf/users',
  reportController.exportUsersPdf,
);

router.get(
  '/export/pdf/donations',
  reportController.exportDonationsPdf,
);

router.get(
  '/export/pdf/orders',
  reportController.exportOrdersPdf,
);

router.get(
  '/export/pdf/challenges',
  reportController.exportChallengesPdf,
);

router.get(
  '/export/pdf/japa',
  reportController.exportJapaPdf,
);

router.get(
  '/export/pdf/festivals',
  reportController.exportFestivalsPdf,
);

router.get(
  '/export/pdf/customer-care',
  reportController.exportCustomerCarePdf,
);
export default router;