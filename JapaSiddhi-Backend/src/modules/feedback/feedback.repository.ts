import {
  ResultSetHeader,
} from 'mysql2';

import mysql from '../../database/mysql';

import {
  CreateFeedbackRequest,
} from './feedback.types';

class FeedbackRepository {

  async create(
    data: CreateFeedbackRequest,
  ): Promise<number> {

    const result =
      await mysql.query<ResultSetHeader>(
        `
        INSERT INTO feedback
        (
          user_id,
          rating,
          title,
          message
        )
        VALUES
        (
          ?,
          ?,
          ?,
          ?
        )
        `,
        [
          data.userId,
          data.rating,
          data.title,
          data.message,
        ],
      );

    return result.insertId;

  }

  async getById(
    id: number,
  ) {

    const rows =
      await mysql.query<any[]>(
        `
        SELECT

          id,

          user_id AS userId,

          rating,

          title,

          message,

          created_at AS createdAt

        FROM feedback

        WHERE id = ?

        LIMIT 1
        `,
        [
          id,
        ],
      );

    return rows[0] ?? null;

  }

  async getUserFeedback(
    userId: number,
  ) {

    return mysql.query<any[]>(
      `
      SELECT

        id,

        rating,

        title,

        message,

        created_at AS createdAt

      FROM feedback

      WHERE user_id = ?

      ORDER BY created_at DESC
      `,
      [
        userId,
      ],
    );

  }

  async getAll() {

    return mysql.query<any[]>(
      `
      SELECT

        id,

        user_id AS userId,

        rating,

        title,

        message,

        created_at AS createdAt

      FROM feedback

      ORDER BY created_at DESC
      `,
    );

  }

}

export default new FeedbackRepository();