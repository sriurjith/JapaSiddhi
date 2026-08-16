import homeRepository from './home.repository';

import {
  HomeResponse,
  JapaIntroduction,
  HomeQuickAction,
} from './home.types';


class HomeService {


  getFallbackHome(): HomeResponse {
    return {
      banner: {
        image: null,
        title: 'Welcome to Japa Siddhi',
        description:
          'Begin your spiritual journey with daily mantra chanting and devotion.',
        action: 'CHANT',
      },
      japaIntroduction: {
        title: 'What is Japa?',
        description:
          'Japa is the practice of repeating a sacred mantra with devotion and focus.',
        howItWorks: [
          'Select your preferred mantra',
          'Create a Japa Goal',
          'Complete your daily chanting target',
        ],
      },
      globalJapaCount: {
        totalJapaCount: 0,
        userJapaCount: 0,
      },
      featuredMantras: [],
      myProjects: [],
      todayProgress: {
        todayCount: 0,
        completedProjects: 0,
        totalActiveProjects: 0,
      },
      upcomingFestival: null,
      quickActions: [
        {
          id: 'chant',
          title: 'Japa Chanting',
          description: 'Community, private, and challenge japa',
          icon: 'om',
          actionType: 'SCREEN',
          actionValue: 'CHANT',
          displayOrder: 1,
        },
        {
          id: 'baanalingam',
          title: 'Baanalingam',
          description: 'Apply for Baanalingam distribution',
          icon: 'banalingam',
          actionType: 'SCREEN',
          actionValue: 'BAANALINGAM',
          displayOrder: 2,
        },
        {
          id: 'donate',
          title: 'Annadanam',
          description: 'Sponsor food seva and donations',
          icon: 'donation',
          actionType: 'SCREEN',
          actionValue: 'DONATE',
          displayOrder: 3,
        },
        {
          id: 'homam',
          title: 'Nithya Homam',
          description: 'Enroll for daily homam',
          icon: 'festivals',
          actionType: 'SCREEN',
          actionValue: 'NITHYA_HOMAM',
          displayOrder: 4,
        },
        {
          id: 'orders',
          title: 'Orders & Tracking',
          description: 'Track mala, gifts, and Baanalingam',
          icon: 'store',
          actionType: 'SCREEN',
          actionValue: 'ORDERS',
          displayOrder: 5,
        },
        {
          id: 'care',
          title: 'Customer Care',
          description: 'Tickets, WhatsApp, and FAQ',
          icon: 'customer_care',
          actionType: 'SCREEN',
          actionValue: 'CUSTOMER_CARE',
          displayOrder: 6,
        },
      ],
    };
  }

  async getHome(
    userId: number,
  ): Promise<HomeResponse> {
    try {
      return await this.getHomeFromDatabase(userId);
    } catch (error) {
      console.warn('Home database unavailable, using Node fallback data.');
      return this.getFallbackHome();
    }
  }

  private async getHomeFromDatabase(
    userId: number,
  ): Promise<HomeResponse> {


    const banner =
      await homeRepository.getHomeBanner();


    const globalJapaCount =
      await homeRepository.getGlobalJapaCount(userId);


    const featuredMantras =
      await homeRepository.getFeaturedMantras();


    const myProjects =
      await homeRepository.getUserProjects(
        userId,
      );


    const todayProgress =
      await homeRepository.getTodayProgress(
        userId,
      );


    const upcomingFestival =
      await homeRepository.getUpcomingFestival();



    const japaIntroduction: JapaIntroduction = {

      title:
        'What is Japa?',

      description:
        'Japa is the practice of repeating a sacred mantra with devotion and focus. In Japa Siddhi, you can select mantras, create goals, complete daily chanting, and track your spiritual journey.',

      howItWorks: [

        'Select your preferred mantra',

        'Create a Japa Goal with target count and completion days',

        'Complete your daily chanting target',

        'Track your personal progress',

        'Contribute to the Global Japa Count',

      ],

    };




    const quickActions: HomeQuickAction[] = this.getFallbackHome().quickActions;



    return {

      banner,

      japaIntroduction,

      globalJapaCount,

      featuredMantras,

      myProjects,

      todayProgress,

      upcomingFestival,

      quickActions,

    };

  }

}


export default new HomeService();