import { ResultSetHeader } from 'mysql2';

import mysql from '../../database/mysql';
import socketEmitter from '../../socket/socketEmitter';

class JapaRepository {

  async createSession(
    data: {
      userId: number;
      japaGoalId?: number;
      mantraType: 'DEFAULT' | 'PERSONAL';
      mantraId?: number | null;
      personalMantraId?: number | null;
      chantMode: 'TAP' | 'VOICE';
      sessionCount: number;
      durationSeconds: number;
      remarks?: string | null;
    },
  ): Promise<number> {

    const result =
      await mysql.query<ResultSetHeader>(
        `
        INSERT INTO japa_sessions
        (
          user_id,
          japa_goal_id,
          mantra_type,
          mantra_id,
          personal_mantra_id,
          chant_mode,
          session_count,
          duration_seconds,
          started_at,
          completed_at,
          remarks
        )
        VALUES
        (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          NOW(),
          NOW(),
          ?
        )
        `,
        [
          data.userId,
          data.japaGoalId ?? null,
          data.mantraType,
          data.mantraId ?? null,
          data.personalMantraId ?? null,
          data.chantMode,
          data.sessionCount,
          data.durationSeconds,
          data.remarks ?? null,
        ],
      );

    return result.insertId;

  }


  async updateJapaGoalProgress(
    goalId: number,
    count: number,
  ): Promise<void> {

    await mysql.query(
      `
      UPDATE japa_goals
      SET
        completed_count =
          completed_count + ?,

        remaining_count =
          CASE
            WHEN remaining_count - ? < 0
            THEN 0
            ELSE remaining_count - ?
          END

      WHERE id = ?
      `,
      [
        count,
        count,
        count,
        goalId,
      ],
    );

  }


  async updateGlobalJapaCount(
    count: number,
  ): Promise<number> {

    await mysql.query(
      `
      UPDATE global_japa_counter
      SET
        total_japa_count =
          total_japa_count + ?

      WHERE id = 1
      `,
      [
        count,
      ],
    );

    const rows =
      await mysql.query<any[]>(
        `
        SELECT
          total_japa_count

        FROM global_japa_counter

        WHERE id = 1
        `,
      );

    const totalCount =
      rows[0]?.total_japa_count ?? 0;

    socketEmitter.emitGlobalCount(
      totalCount,
    );

    return totalCount;

  }


  async getUserTotalJapa(
    userId: number,
  ) {

    const rows =
      await mysql.query<any[]>(
        `
        SELECT
          COALESCE(
            SUM(session_count),
            0
          ) AS totalJapaCount

        FROM japa_sessions

        WHERE user_id = ?
        `,
        [
          userId,
        ],
      );

    return rows[0]?.totalJapaCount ?? 0;

  }


  async getTodayJapa(
    userId: number,
  ) {

    const rows =
      await mysql.query<any[]>(
        `
        SELECT
          COALESCE(
            SUM(session_count),
            0
          ) AS todayJapaCount

        FROM japa_sessions

        WHERE user_id = ?

        AND DATE(created_at) = CURDATE()
        `,
        [
          userId,
        ],
      );

    return rows[0]?.todayJapaCount ?? 0;

  }


  async getGlobalJapaCount() {

    const rows =
      await mysql.query<any[]>(
        `
        SELECT
          total_japa_count

        FROM global_japa_counter

        WHERE id = 1
        `,
      );

    return rows[0]?.total_japa_count ?? 0;

  }

}

export default new JapaRepository();