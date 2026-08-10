import axios from 'axios';


const api = axios.create({
  baseURL: 'http://YOUR_SERVER_IP:5000/api',
  timeout: 30000,
});


export interface CompleteProfileRequest {
  fullName: string;
  email?: string;
  phoneNumber: string;
  gender:
    | 'Male'
    | 'Female'
    | 'Other'
    | 'Prefer Not To Say';

  dob: string;

  countryId: number;
  stateId: number;
  cityId: number;
  languageId: number;

  profileImage?: string | null;
}


class ProfileApi {

  async getLanguages() {
    const response =
      await api.get('/languages');

    return response.data.data;
  }


  async getCountries() {
    const response =
      await api.get('/countries');

    return response.data.data;
  }


  async getStates(countryCode: string) {
    const response =
      await api.get(
        `/states/${countryCode}`,
      );

    return response.data.data;
  }


  async getCities(stateId: number) {
    const response =
      await api.get(
        `/cities/${stateId}`,
      );

    return response.data.data;
  }


  async completeProfile(
    data: CompleteProfileRequest,
  ) {

    const response =
      await api.post(
        '/auth/complete-profile',
        data,
      );

    return response.data;
  }

}


export default new ProfileApi();