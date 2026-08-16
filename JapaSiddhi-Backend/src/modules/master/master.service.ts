import masterRepository from './master.repository';



class MasterService {


  async getCountries() {

    return masterRepository.getCountries();

  }



  async getStates(
    countryId:number,
  ) {

    return masterRepository.getStates(
      countryId,
    );

  }



  async getCities(
    stateId:number,
  ) {

    return masterRepository.getCities(
      stateId,
    );

  }



  async getLanguages() {
    try {
      return await masterRepository.getLanguages();
    } catch (error) {
      console.warn('Languages database unavailable, using Node fallback data.');
      return [
        {id: 1, code: 'en', name: 'English', nativeName: 'English', isActive: 1},
        {id: 2, code: 'te', name: 'Telugu', nativeName: 'తెలుగు', isActive: 1},
        {id: 3, code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', isActive: 1},
        {id: 4, code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', isActive: 1},
        {id: 5, code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', isActive: 1},
      ];
    }
  }


}


export default new MasterService();