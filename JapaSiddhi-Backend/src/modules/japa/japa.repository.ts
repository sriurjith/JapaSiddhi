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


  private toCount(value: unknown): number {
    return Number(value ?? 0) || 0;
  }

  async updateJapaGoalProgress(
    goalId: number,
    _count: number,
    userId: number,
  ): Promise<void> {
    const rows = await mysql.query<any[]>(
      `
      SELECT COALESCE(SUM(session_count), 0) AS total
      FROM japa_sessions
      WHERE japa_goal_id = ?
      AND user_id = ?
      `,
      [goalId, userId],
    );
    const completed = this.toCount(rows[0]?.total);

    await mysql.query(
      `
      UPDATE japa_goals
      SET
        completed_count = ?,
        remaining_count =
          CASE
            WHEN target_count - ? < 0 THEN 0
            ELSE target_count - ?
          END
      WHERE id = ?
      AND user_id = ?
      `,
      [completed, completed, completed, goalId, userId],
    );
  }

  async getExactGlobalJapaCount(): Promise<number> {
    const rows = await mysql.query<any[]>(
      `
      SELECT COALESCE(SUM(session_count), 0) AS totalJapaCount
      FROM japa_sessions
      `,
    );
    return this.toCount(rows[0]?.totalJapaCount);
  }

  async updateGlobalJapaCount(
    _count: number,
  ): Promise<number> {
    const totalCount = await this.getExactGlobalJapaCount();

    await mysql.query(
      `
      UPDATE global_japa_counter
      SET total_japa_count = ?
      WHERE id = 1
      `,
      [totalCount],
    );

    socketEmitter.emitGlobalCount(totalCount);
    return totalCount;
  }

  async getUserTotalJapa(userId: number) {
    const rows = await mysql.query<any[]>(
      `
      SELECT COALESCE(SUM(session_count), 0) AS totalJapaCount
      FROM japa_sessions
      WHERE user_id = ?
      `,
      [userId],
    );
    return this.toCount(rows[0]?.totalJapaCount);
  }

  async getRangeJapa(userId: number, fromSql: string) {
    const rows = await mysql.query<any[]>(
      `
      SELECT COALESCE(SUM(session_count), 0) AS total
      FROM japa_sessions
      WHERE user_id = ?
      AND DATE(created_at) >= ${fromSql}
      `,
      [userId],
    );
    return this.toCount(rows[0]?.total);
  }

  async getTodayJapa(userId: number) {
    const rows = await mysql.query<any[]>(
      `
      SELECT COALESCE(SUM(session_count), 0) AS todayJapaCount
      FROM japa_sessions
      WHERE user_id = ?
      AND DATE(created_at) = CURDATE()
      `,
      [userId],
    );
    return this.toCount(rows[0]?.todayJapaCount);
  }

  async getWeekJapa(userId: number) {
    return this.getRangeJapa(userId, "DATE('now', '-6 days')");
  }

  async getMonthJapa(userId: number) {
    const rows = await mysql.query<any[]>(
      `
      SELECT COALESCE(SUM(session_count), 0) AS total
      FROM japa_sessions
      WHERE user_id = ?
      AND strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')
      `,
      [userId],
    );
    return this.toCount(rows[0]?.total);
  }

  async getGlobalJapaCount() {
    return this.getExactGlobalJapaCount();
  }

}

export default new JapaRepository();