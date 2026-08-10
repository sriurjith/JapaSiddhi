import {
  CreateFeedbackRequest,
} from './feedback.types';

import feedbackRepository from './feedback.repository';

class FeedbackService {

  async create(
    data: CreateFeedbackRequest,
  ) {

    const id =
      await feedbackRepository.create(
        data,
      );

    return {

      id,

    };

  }

  async getById(
    id: number,
  ) {

    const feedback =
      await feedbackRepository.getById(
        id,
      );

    if (!feedback) {

      throw new Error(
        'Feedback not found',
      );

    }

    return feedback;

  }

  async getUserFeedback(
    userId: number,
  ) {

    return feedbackRepository.getUserFeedback(
      userId,
    );

  }

  async getAll() {

    return feedbackRepository.getAll();

  }

}

export default new FeedbackService();