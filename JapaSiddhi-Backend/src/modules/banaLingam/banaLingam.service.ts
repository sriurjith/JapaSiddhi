import {
  CreateBanaLingamRequest,
  BanaLingamRequestStatus,
} from './banaLingam.types';

import banaLingamRepository from './banaLingam.repository';

class BanaLingamService {

  async create(
    data: CreateBanaLingamRequest,
  ) {

    const id =
      await banaLingamRepository.create(
        data,
      );

    return {

      id,

    };

  }

  async getById(
    id: number,
  ) {

    const request =
      await banaLingamRepository.getById(
        id,
      );

    if (!request) {

      throw new Error(
        'Bana Lingam request not found',
      );

    }

    return request;

  }

  async getUserRequests(
    userId: number,
  ) {

    return banaLingamRepository.getUserRequests(
      userId,
    );

  }

  async updateStatus(
    id: number,
    status: BanaLingamRequestStatus,
    remarks?: string | null,
  ) {

    const request =
      await banaLingamRepository.getById(
        id,
      );

    if (!request) {

      throw new Error(
        'Bana Lingam request not found',
      );

    }

    await banaLingamRepository.updateStatus(
      id,
      status,
      remarks,
    );

    return {

      success: true,

    };

  }

}

export default new BanaLingamService();