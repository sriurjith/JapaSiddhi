import apiService from '../../../services/apiService';
import {HomeResponse} from '../types/home';

class HomeApi {
  async getHomeData(): Promise<HomeResponse> {
    const response = await apiService.get('/home');

    return response.data.data;
  }
}

export default new HomeApi();