export enum ExportFormat {

  JSON = 'JSON',

  EXCEL = 'EXCEL',

  PDF = 'PDF',

}

export interface DateFilter {

  fromDate?: string;

  toDate?: string;

}

export interface PaginationFilter extends DateFilter {

  page?: number;

  limit?: number;

  search?: string;

  sortBy?: string;

  sortOrder?: 'ASC' | 'DESC';

}

export interface DashboardAnalytics {

  totalUsers: number;

  activeUsers: number;

  totalJapa: number;

  todayJapa: number;

  monthlyJapa: number;

  totalGoals: number;

  completedGoals: number;

  totalDonations: number;

  monthlyDonations: number;

  totalOrders: number;

  pendingOrders: number;

  completedOrders: number;

  totalChallenges: number;

  activeChallenges: number;

  totalSupportTickets: number;

  openSupportTickets: number;

  totalFeedback: number;

}

export interface UserReportFilter extends PaginationFilter {

  countryId?: number;

  stateId?: number;

  cityId?: number;

  languageId?: number;

  isActive?: boolean;

}

export interface DonationReportFilter extends PaginationFilter {

  donationType?: string;

  paymentStatus?: string;

}

export interface OrderReportFilter extends PaginationFilter {

  orderType?: string;

  orderStatus?: string;

  paymentStatus?: string;

}

export interface ChallengeReportFilter extends PaginationFilter {

  challengeId?: number;

}

export interface UserReportRow {

  id: number;

  fullName: string;

  email: string;

  mobile: string;

  country: string;

  state: string;

  city: string;

  joinedDate: Date;

  totalJapa: number;

  totalDonations: number;

  totalOrders: number;

}

export interface DonationReportRow {

  id: number;

  fullName: string;

  donationType: string;

  amount: number;

  paymentStatus: string;

  donatedAt: Date;

}

export interface OrderReportRow {

  id: number;

  orderNumber: string;

  fullName: string;

  orderType: string;

  orderStatus: string;

  paymentStatus: string;

  amount: number;

  createdAt: Date;

}

export interface ChallengeReportRow {

  id: number;

  title: string;

  participants: number;

  completed: number;

  rewardsGiven: number;

}

export interface JapaReportRow {

  fullName: string;

  mantra: string;

  tapCount: number;

  voiceCount: number;

  totalCount: number;

}

export interface FestivalReportRow {

  festivalName: string;

  festivalDate: Date;

  notificationSent: boolean;

}

export interface CustomerCareReportRow {

  ticketNumber: string;

  fullName: string;

  subject: string;

  status: string;

  createdAt: Date;

}