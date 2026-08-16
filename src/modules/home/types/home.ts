export interface HomeBanner {
  id: number;

  title: string;

  subtitle: string;

  imageUrl: string;

  buttonText?: string;

  buttonAction?: string;
}


export interface JapaIntroduction {
  title: string;

  description: string;
}


export interface GlobalJapaCount {

  totalCount: number;

  userCount: number;

}


export interface HomeMantra {

  id: number;

  name: string;

  sanskritText: string;

  transliteration?: string;

  meaning?: string;

  imageUrl?: string;

}


export interface UserJapaProject {

  id: number;

  projectName: string;

  mantraName: string;

  targetCount: number;

  completedCount: number;

  remainingCount: number;

  completionPercentage: number;

}


export interface TodayJapaProgress {

  todayCount: number;

  todayTarget: number;

  percentage: number;

}


export interface UpcomingFestival {

  id: number;

  festivalName: string;

  description?: string;

  festivalDate: string;

  festivalType: string;

  imageUrl?: string;

}




export interface HomeQuickAction {

  id: number;


  title: string;


 
  description: string;


 
  icon: string;


  
  image?: string;


 
  route: string;

}



export interface HomeResponse {

  banner: HomeBanner;


  
  introduction?: JapaIntroduction;



  globalJapaCount: GlobalJapaCount;



  
  featuredMantras?: HomeMantra[];



  
  todayProgress?: TodayJapaProgress;



 
  userProjects?: UserJapaProject[];



  upcomingFestival: UpcomingFestival | null;



  quickActions: HomeQuickAction[];

}