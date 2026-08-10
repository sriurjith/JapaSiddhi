import {
  CreateTicketRequest,
  TicketStatus,
} from './customerCare.types';

import customerCareRepository from './customerCare.repository';

class CustomerCareService {

  async create(
    data: CreateTicketRequest,
  ) {

    const id =
      await customerCareRepository.create(
        data,
      );

    return {

      id,

    };

  }

  async getById(
    id: number,
  ) {

    const ticket =
      await customerCareRepository.getById(
        id,
      );

    if (!ticket) {

      throw new Error(
        'Support ticket not found',
      );

    }

    return ticket;

  }

  async getUserTickets(
    userId: number,
  ) {

    return customerCareRepository.getUserTickets(
      userId,
    );

  }

  async reply(
    id: number,
    reply: string,
    status: TicketStatus,
  ) {

    const ticket =
      await customerCareRepository.getById(
        id,
      );

    if (!ticket) {

      throw new Error(
        'Support ticket not found',
      );

    }

    await customerCareRepository.reply(
      id,
      reply,
      status,
    );

    return {

      success: true,

    };

  }

}

export default new CustomerCareService();