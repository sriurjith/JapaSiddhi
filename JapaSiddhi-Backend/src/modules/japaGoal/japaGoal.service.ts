import {
  CreateJapaGoalRequest,
} from './japaGoal.types';

import japaGoalRepository from './japaGoal.repository';


class JapaGoalService {


  async createGoal(
    userId: number,
    data: CreateJapaGoalRequest,
  ) {


    const dailyTarget =
      Math.ceil(
        data.targetCount / data.days,
      );


    const startDate =
      new Date(data.startDate);


    const endDate =
      new Date(startDate);


    endDate.setDate(
      endDate.getDate() + data.days,
    );


    const goalId =
      await japaGoalRepository.createGoal({

        userId,

        mantraType:
          data.mantraType,

        mantraId:
          data.mantraId ?? null,

        personalMantraId:
          data.personalMantraId ?? null,

        goalName:
          data.goalName,

        targetCount:
          data.targetCount,

        remainingCount:
          data.targetCount,

        dailyTarget,

        startDate:
          startDate
            .toISOString()
            .split('T')[0],

        endDate:
          endDate
            .toISOString()
            .split('T')[0],

        notes:
          data.notes ?? null,

      });


    return {

      goalId,

      dailyTarget,

    };

  }



  async getGoals(
    userId: number,
  ) {


    return japaGoalRepository.getUserGoals(
      userId,
    );

  }



  async getGoal(
    id: number,
    userId: number,
  ) {


    return japaGoalRepository.getGoalById(
      id,
      userId,
    );

  }



  async updateStatus(
    id: number,
    userId: number,
    status: string,
  ) {


    await japaGoalRepository.updateStatus(
      id,
      userId,
      status,
    );


    return {
      success: true,
    };

  }



  async cancelGoal(
    id: number,
    userId: number,
  ) {


    await japaGoalRepository.deleteGoal(
      id,
      userId,
    );


    return {
      success: true,
    };

  }


}


export default new JapaGoalService();