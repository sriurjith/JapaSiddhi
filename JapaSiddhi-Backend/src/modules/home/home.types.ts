export interface HomeBanner {
  image: string | null;
  title: string | null;
  description: string | null;
  action: string | null;
}


export interface JapaIntroduction {

  title: string;

  description: string;

  howItWorks: string[];

}


export interface GlobalJapaCount {
  totalJapaCount: number;
  userJapaCount: number;
}


export interface HomeMantra {

  id: number;

  mantraName: string;

  deityName: string;

  transliteration: string;

  imageUrl: string | null;

  isFeatured: boolean;

}


export interface UserJapaProject {

  id: number;

  goalName: string;

  mantraType: 'DEFAULT' | 'PERSONAL';

  mantraId: number | null;

  personalMantraId: number | null;

  mantraName: string | null;

  targetCount: number;

  completedCount: number;

  remainingCount: number;

  dailyTarget: number;

  startDate: string;

  endDate: string;

  status:
    | 'ACTIVE'
    | 'COMPLETED'
    | 'PAUSED'
    | 'CANCELLED';

}


export interface TodayJapaProgress {

  todayCount: number;

  completedProjects: number;

  totalActiveProjects: number;

}


export interface UpcomingFestival {

  id: number;

  festivalName: string;

  description: string | null;

  festivalDate: string;

  festivalType:
    | 'HINDU'
    | 'BIRTHDAY'
    | 'ANNIVERSARY'
    | 'SPECIAL';

}


export interface HomeQuickAction {

  id: string;

  title: string;

  description: string;

  icon: string;

  actionType: string;

  actionValue: string | null;

  displayOrder: number;

}


export interface HomeResponse {

  banner: HomeBanner;

  japaIntroduction: JapaIntroduction;

  globalJapaCount: GlobalJapaCount;

  featuredMantras: HomeMantra[];

  myProjects: UserJapaProject[];

  todayProgress: TodayJapaProgress;

  upcomingFestival: UpcomingFestival | null;

  quickActions: HomeQuickAction[];

}