import homeRepository from './home.repository';

import {
  HomeResponse,
  JapaIntroduction,
  HomeQuickAction,
} from './home.types';


class HomeService {


  async getHome(
    userId: number,
  ): Promise<HomeResponse> {


    const banner =
      await homeRepository.getHomeBanner();


    const globalJapaCount =
      await homeRepository.getGlobalJapaCount();


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




    const quickActions: HomeQuickAction[] = [

      {
        id: 'chant',

        title:
          'Chant Japa',

        description:
          'Repeat mantras and track your chanting journey',

        icon:
          'om',

        actionType:
          'SCREEN',

        actionValue:
          'CHANT',

        displayOrder:
          1,
      },


      {
        id: 'goals',

        title:
          'Japa Goals',

        description:
          'Create and complete your personal japa goals',

        icon:
          'target',

        actionType:
          'SCREEN',

        actionValue:
          'JAPA_GOALS',

        displayOrder:
          2,
      },


      {
        id: 'family',

        title:
          'Family Japa',

        description:
          'Chant together with your family members',

        icon:
          'family',

        actionType:
          'SCREEN',

        actionValue:
          'FAMILY_JAPA',

        displayOrder:
          3,
      },


      {
        id: 'donate',

        title:
          'Donate',

        description:
          'Support Bilva Patra Trust',

        icon:
          'donation',

        actionType:
          'SCREEN',

        actionValue:
          'DONATE',

        displayOrder:
          4,
      },


      {
        id: 'festival',

        title:
          'Festivals',

        description:
          'View upcoming spiritual events',

        icon:
          'calendar',

        actionType:
          'SCREEN',

        actionValue:
          'FESTIVALS',

        displayOrder:
          5,
      },

    ];



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