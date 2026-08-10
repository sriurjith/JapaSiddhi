import festivalRepository from './festival.repository';


class FestivalService {


  async getUpcomingFestivals() {

    return festivalRepository.getUpcomingFestivals();

  }



  async getTodayFestival() {

    return festivalRepository.getTodayFestival();

  }


}


export default new FestivalService();