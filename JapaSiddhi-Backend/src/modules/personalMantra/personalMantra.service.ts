import {
  CreatePersonalMantraRequest,
  UpdatePersonalMantraRequest,
} from './personalMantra.types';

import personalMantraRepository from './personalMantra.repository';


class PersonalMantraService {


  async create(
    userId: number,
    data: CreatePersonalMantraRequest,
  ) {


    const id =
      await personalMantraRepository.create(
        userId,
        {
          mantraName:
            data.mantraName,

          deityName:
            data.deityName ?? null,

          mantraText:
            data.mantraText,

          transliteration:
            data.transliteration ?? null,

          preferredJapaCount:
            data.preferredJapaCount ?? 108,

          imageUrl:
            data.imageUrl ?? null,

          audioUrl:
            data.audioUrl ?? null,
        },
      );


    return {
      id,
    };

  }



  async getAll(
    userId: number,
  ) {


    return personalMantraRepository.findAll(
      userId,
    );

  }



  async getById(
    id: number,
    userId: number,
  ) {


    return personalMantraRepository.findById(
      id,
      userId,
    );

  }



  async update(
    id: number,
    userId: number,
    data: UpdatePersonalMantraRequest,
  ) {


    await personalMantraRepository.update(
      id,
      userId,
      data,
    );


    return {
      success: true,
    };

  }



  async delete(
    id: number,
    userId: number,
  ) {


    await personalMantraRepository.delete(
      id,
      userId,
    );


    return {
      success: true,
    };

  }


}


export default new PersonalMantraService();