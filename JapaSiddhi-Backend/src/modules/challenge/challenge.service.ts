import {
  CreateChallengeRequest,
} from './challenge.types';

import challengeRepository from './challenge.repository';

class ChallengeService {

  async create(
    data: CreateChallengeRequest,
  ) {

    const id =
      await challengeRepository.create(
        data,
      );

    return {

      id,

    };

  }

  async getById(
    id: number,
  ) {

    const challenge =
      await challengeRepository.getById(
        id,
      );

    if (!challenge) {

      throw new Error(
        'Challenge not found',
      );

    }

    return challenge;

  }

  async getActiveChallenges() {

    return challengeRepository.getActiveChallenges();

  }

  async join(
    challengeId: number,
    userId: number,
  ) {

    const challenge =
      await challengeRepository.getById(
        challengeId,
      );

    if (!challenge) {

      throw new Error(
        'Challenge not found',
      );

    }

    const participant =
      await challengeRepository.getParticipant(
        challengeId,
        userId,
      );

    if (participant) {

      throw new Error(
        'You have already joined this challenge',
      );

    }

    const id =
      await challengeRepository.join(
        challengeId,
        userId,
      );

    return {

      id,

    };

  }

  async updateProgress(
    challengeId: number,
    userId: number,
    currentValue: number,
  ) {

    const challenge =
      await challengeRepository.getById(
        challengeId,
      );

    if (!challenge) {

      throw new Error(
        'Challenge not found',
      );

    }

    const participant =
      await challengeRepository.getParticipant(
        challengeId,
        userId,
      );

    if (!participant) {

      throw new Error(
        'Challenge participant not found',
      );

    }

    const completed =
      currentValue >= challenge.targetValue;

    await challengeRepository.updateProgress(
      challengeId,
      userId,
      currentValue,
      completed,
    );

    return {

      success: true,

      completed,

    };

  }

  async leaderboard(
    challengeId: number,
  ) {

    return challengeRepository.leaderboard(
      challengeId,
    );

  }

}

export default new ChallengeService();