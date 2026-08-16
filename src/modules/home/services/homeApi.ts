import apiService from '../../../services/apiService';
import {HomeQuickAction, HomeResponse} from '../types/home';

const ICON_MAP: Record<string, string> = {
  om: 'japa',
  chant: 'japa',
  japa: 'japa',
  target: 'progress',
  goals: 'progress',
  progress: 'progress',
  family: 'family',
  donation: 'donation',
  donate: 'donation',
  calendar: 'festivals',
  festival: 'festivals',
  festivals: 'festivals',
  store: 'store',
  orders: 'orders',
  achievements: 'achievements',
  customer_care: 'customer_care',
  profile: 'profile',
  banalingam: 'banalingam',
};

const mapQuickActions = (actions: any[] = []): HomeQuickAction[] =>
  actions.map((item, index) => ({
    id: Number(item.id) || index + 1,
    title: item.title ?? '',
    description: item.description ?? '',
    icon: ICON_MAP[item.icon] ?? item.icon ?? 'japa',
    image: item.image,
    route: item.route ?? item.actionValue ?? '',
  }));

const mapHomeResponse = (data: any): HomeResponse => ({
  banner: {
    id: data?.banner?.id ?? 1,
    title: data?.banner?.title ?? 'Welcome to Japa Siddhi',
    subtitle:
      data?.banner?.subtitle ??
      data?.banner?.description ??
      'Begin your spiritual journey with daily mantra chanting and devotion.',
    imageUrl: data?.banner?.imageUrl ?? data?.banner?.image ?? '',
    buttonText: data?.banner?.buttonText ?? 'Start Japa',
    buttonAction: data?.banner?.buttonAction ?? data?.banner?.action,
  },
  introduction: data?.introduction ?? data?.japaIntroduction,
  globalJapaCount: {
    totalCount:
      data?.globalJapaCount?.totalCount ??
      data?.globalJapaCount?.totalJapaCount ??
      0,
    userCount:
      data?.globalJapaCount?.userCount ??
      data?.globalJapaCount?.userJapaCount ??
      0,
  },
  featuredMantras: data?.featuredMantras,
  todayProgress: data?.todayProgress,
  userProjects: data?.userProjects ?? data?.myProjects,
  upcomingFestival: data?.upcomingFestival ?? null,
  quickActions: mapQuickActions(data?.quickActions),
});

class HomeApi {
  async getHomeData(): Promise<HomeResponse> {
    const response = await apiService.get('/home');
    return mapHomeResponse(response.data.data);
  }
}

export default new HomeApi();
