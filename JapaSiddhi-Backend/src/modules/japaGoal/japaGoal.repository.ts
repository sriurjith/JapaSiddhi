import { ResultSetHeader } from 'mysql2';

import mysql from '../../database/mysql';


class JapaGoalRepository {


  async createGoal(
    data: {
      userId: number;
      mantraType: 'DEFAULT' | 'PERSONAL';
      mantraId?: number | null;
      personalMantraId?: number | null;
      goalName: string;
      targetCount: number;
      remainingCount: number;
      dailyTarget: number;
      startDate: string;
      endDate: string;
      notes?: string | null;
    },
  ): Promise<number> {


    const result =
      await mysql.query<ResultSetHeader>(
        `
        INSERT INTO japa_goals
        (
          user_id,
          mantra_type,
          mantra_id,
          personal_mantra_id,
          goal_name,
          target_count,
          completed_count,
          remaining_count,
          start_date,
          end_date,
          daily_target,
          status,
          notes
        )
        VALUES
        (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          0,
          ?,
          ?,
          ?,
          ?,
          'ACTIVE',
          ?
        )
        `,
        [
          data.userId,
          data.mantraType,
          data.mantraId ?? null,
          data.personalMantraId ?? null,
          data.goalName,
          data.targetCount,
          data.remainingCount,
          data.startDate,
          data.endDate,
          data.dailyTarget,
          data.notes ?? null,
        ],
      );


    return result.insertId;

  }



  async getUserGoals(
    userId: number,
  ) {


    return mysql.query<any[]>(
      `
      SELECT

        j.id,

        j.goal_name AS goalName,

        j.mantra_type AS mantraType,

        j.mantra_id AS mantraId,

        j.personal_mantra_id AS personalMantraId,

        COALESCE(
          m.mantra_name,
          upm.mantra_name
        ) AS mantraName,

        j.target_count AS targetCount,

        j.completed_count AS completedCount,

        j.remaining_count AS remainingCount,

        j.daily_target AS dailyTarget,

        j.start_date AS startDate,

        j.end_date AS endDate,

        j.status

      FROM japa_goals j

      LEFT JOIN mantras m
        ON m.id = j.mantra_id

      LEFT JOIN user_personal_mantras upm
        ON upm.id = j.personal_mantra_id

      WHERE j.user_id = ?

      ORDER BY j.created_at DESC
      `,
      [
        userId,
      ],
    );

  }



  async getGoalById(
    id: number,
    userId: number,
  ) {


    const rows =
      await mysql.query<any[]>(
        `
        SELECT *

        FROM japa_goals

        WHERE id = ?

        AND user_id = ?

        LIMIT 1
        `,
        [
          id,
          userId,
        ],
      );


    return rows.length
      ? rows[0]
      : null;

  }



  async updateStatus(
    id: number,
    userId: number,
    status: string,
  ): Promise<void> {


    await mysql.query(
      `
      UPDATE japa_goals

      SET status = ?

      WHERE id = ?

      AND user_id = ?
      `,
      [
        status,
        id,
        userId,
      ],
    );

  }



  async deleteGoal(
    id: number,
    userId: number,
  ): Promise<void> {


    await mysql.query(
      `
      UPDATE japa_goals

      SET status = 'CANCELLED'

      WHERE id = ?

      AND user_id = ?
      `,
      [
        id,
        userId,
      ],
    );

  }


}


export default new JapaGoalRepository();