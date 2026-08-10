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

    return masterRepository.getLanguages();

  }


}


export default new MasterService();