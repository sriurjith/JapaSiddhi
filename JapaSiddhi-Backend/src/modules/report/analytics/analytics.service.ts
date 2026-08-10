import reportRepository from '../report.repository';

class AnalyticsService {

  async dashboardAnalytics() {
    return reportRepository.dashboardAnalytics();
  }

  async dailyJapaGraph() {
    return reportRepository.dailyJapaGraph();
  }

  async monthlyDonationGraph() {
    return reportRepository.monthlyDonationGraph();
  }

  async monthlyUserRegistrationGraph() {
    return reportRepository.monthlyUserRegistrationGraph();
  }

  async orderStatusGraph() {
    return reportRepository.orderStatusGraph();
  }

  async donationTypeGraph() {
    return reportRepository.donationTypeGraph();
  }

  async challengeCompletionGraph() {
    return reportRepository.challengeCompletionGraph();
  }

  async topJapaUsers(
    limit: number = 10,
  ) {
    return reportRepository.topJapaUsers(limit);
  }

  async topDonors(
    limit: number = 10,
  ) {
    return reportRepository.topDonors(limit);
  }

  async mostChantedMantras(
    limit: number = 10,
  ) {
    return reportRepository.mostChantedMantras(limit);
  }

  async donationSummary() {
    return reportRepository.donationSummary();
  }

  async orderSummary() {
    return reportRepository.orderSummary();
  }

  async userGrowthSummary() {
    return reportRepository.userGrowthSummary();
  }

  async challengeRewardSummary() {
    return reportRepository.challengeRewardSummary();
  }

  async monthlyDashboardSummary() {
    return reportRepository.monthlyDashboardSummary();
  }

  async yearlyDashboardSummary() {
    return reportRepository.yearlyDashboardSummary();
  }

  async leaderboard(
    limit: number = 10,
  ) {

    const [
      topJapaUsers,
      topDonors,
      mostChantedMantras,
    ] = await Promise.all([
      this.topJapaUsers(limit),
      this.topDonors(limit),
      this.mostChantedMantras(limit),
    ]);

    return {
      topJapaUsers,
      topDonors,
      mostChantedMantras,
    };

  }

  async graphs() {

    const [
      dailyJapa,
      donationGraph,
      registrationGraph,
      orderGraph,
      donationTypeGraph,
      challengeGraph,
    ] = await Promise.all([
      this.dailyJapaGraph(),
      this.monthlyDonationGraph(),
      this.monthlyUserRegistrationGraph(),
      this.orderStatusGraph(),
      this.donationTypeGraph(),
      this.challengeCompletionGraph(),
    ]);

    return {
      dailyJapa,
      donationGraph,
      registrationGraph,
      orderGraph,
      donationTypeGraph,
      challengeGraph,
    };

  }

  async statistics() {

    const [
      analytics,
      donationSummary,
      orderSummary,
      challengeRewardSummary,
    ] = await Promise.all([
      this.dashboardAnalytics(),
      this.donationSummary(),
      this.orderSummary(),
      this.challengeRewardSummary(),
    ]);

    return {
      analytics,
      donationSummary,
      orderSummary,
      challengeRewardSummary,
    };

  }

  async reportDashboard() {

    const [
      analytics,
      monthlySummary,
      yearlySummary,
      donationSummary,
      orderSummary,
      userGrowth,
      challengeRewards,
    ] = await Promise.all([
      this.dashboardAnalytics(),
      this.monthlyDashboardSummary(),
      this.yearlyDashboardSummary(),
      this.donationSummary(),
      this.orderSummary(),
      this.userGrowthSummary(),
      this.challengeRewardSummary(),
    ]);

    return {
      analytics,
      monthlySummary,
      yearlySummary,
      donationSummary,
      orderSummary,
      userGrowth,
      challengeRewards,
    };

  }

  async completeDashboard() {

    const [
      dashboard,
      graphs,
      leaderboard,
      statistics,
    ] = await Promise.all([
      this.reportDashboard(),
      this.graphs(),
      this.leaderboard(),
      this.statistics(),
    ]);

    return {
      dashboard,
      graphs,
      leaderboard,
      statistics,
    };

  }

}

export default new AnalyticsService();