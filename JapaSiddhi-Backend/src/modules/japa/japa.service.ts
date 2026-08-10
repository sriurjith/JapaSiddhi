import {
  CreateJapaSessionRequest,
  JapaValidationResult,
  JapaSummary,
} from './japa.types';

import japaRepository from './japa.repository';

class JapaService {

  async createSession(
    userId: number,
    data: CreateJapaSessionRequest,
  ) {

    const sessionId =
      await japaRepository.createSession({

        userId,

        japaGoalId:
          data.japaGoalId,

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


    if (data.japaGoalId) {

      await japaRepository.updateJapaGoalProgress(
        data.japaGoalId,
        data.sessionCount,
      );

    }


    // Updates database and emits Socket.IO event
    const globalCount =
      await japaRepository.updateGlobalJapaCount(
        data.sessionCount,
      );


    return {

      sessionId,

      count:
        data.sessionCount,

      globalCount,

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

    const totalJapaCount =
      await japaRepository.getUserTotalJapa(
        userId,
      );

    const todayJapaCount =
      await japaRepository.getTodayJapa(
        userId,
      );

    const globalJapaCount =
      await japaRepository.getGlobalJapaCount();

    return {

      totalJapaCount,

      todayJapaCount,

      globalJapaCount,

    };

  }

}

export default new JapaService();