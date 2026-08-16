import {
  CreateJapaSessionRequest,
  JapaValidationResult,
  JapaSummary,
} from './japa.types';

import japaRepository from './japa.repository';
import japaGoalRepository from '../japaGoal/japaGoal.repository';
import AppError from '../../utils/appError';

class JapaService {

  async createSession(
    userId: number,
    data: CreateJapaSessionRequest,
  ) {

    let japaGoalId = data.japaGoalId;

    if (japaGoalId) {
      const ownedGoal = await japaGoalRepository.getGoalById(
        japaGoalId,
        userId,
      );
      if (!ownedGoal) {
        throw new AppError('Japa goal not found for this user', 403);
      }
    } else {
      japaGoalId = await japaGoalRepository.findOrCreateActiveGoal(
        userId,
        data.mantraId,
      );
    }

    const sessionId =
      await japaRepository.createSession({

        userId,

        japaGoalId,

        mantraType:
          data.mantraType,

        mantraId:
          data.mantraId,

        personalMantraId:
          data.personalMantraId,

        chantMode:
          data.chantMode,

        sessionCount:
          data.sessionCount,

        durationSeconds:
          data.durationSeconds ?? 0,

        remarks:
          data.remarks ?? null,

      });


    if (japaGoalId) {
      await japaRepository.updateJapaGoalProgress(
        japaGoalId,
        data.sessionCount,
        userId,
      );
    }


    // Updates database and emits Socket.IO event
    const [globalCount, userTotal] = await Promise.all([
      japaRepository.updateGlobalJapaCount(data.sessionCount),
      japaRepository.getUserTotalJapa(userId),
    ]);


    return {

      sessionId,

      count:
        data.sessionCount,

      globalCount,

      userTotal,

    };

  }



  validateTapChant(
    expectedSeconds: number,
    actualSeconds: number,
  ): JapaValidationResult {

    const isValid =
      actualSeconds >= expectedSeconds;

    return {

      isValid,

      mode: 'TAP',

      message:
        isValid
          ? 'Valid Japa'
          : 'Chant duration too short',

      sessionCount:
        isValid ? 1 : 0,

    };

  }



  validateVoiceChant(
    matchPercentage: number,
  ): JapaValidationResult {

    const isValid =
      matchPercentage >= 50;

    return {

      isValid,

      mode: 'VOICE',

      message:
        isValid
          ? 'Valid Japa'
          : 'Mantra not matched',

      sessionCount:
        isValid ? 1 : 0,

    };

  }



  async getSummary(
    userId: number,
  ): Promise<JapaSummary> {

    const [
      totalJapaCount,
      todayJapaCount,
      weeklyJapaCount,
      monthlyJapaCount,
      globalJapaCount,
    ] = await Promise.all([
      japaRepository.getUserTotalJapa(userId),
      japaRepository.getTodayJapa(userId),
      japaRepository.getWeekJapa(userId),
      japaRepository.getMonthJapa(userId),
      japaRepository.getGlobalJapaCount(),
    ]);

    return {
      totalJapaCount,
      todayJapaCount,
      weeklyJapaCount,
      monthlyJapaCount,
      globalJapaCount,
    };

  }

}

export default new JapaService();