import apiService from '../../../services/apiService';

export interface LoginRequest {
  firebaseToken: string;
  deviceType: 'ANDROID' | 'IOS';
  deviceModel?: string;
  deviceOs?: string;
  appVersion?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: any;
  };
}

class AuthApi {
  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await apiService.post('/auth/login', request);
    return response.data;
  }

  async completeProfile(data: any, token: string) {
    const response = await apiService.put(
      '/auth/complete-profile',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  async getProfile(token: string) {
    const response = await apiService.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}

export default new AuthApi();