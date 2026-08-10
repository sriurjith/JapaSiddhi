import {
  ResultSetHeader,
} from 'mysql2';

import mysql from '../../database/mysql';

import {
  CreateTicketRequest,
  TicketStatus,
} from './customerCare.types';

class CustomerCareRepository {

  async create(
    data: CreateTicketRequest,
  ): Promise<number> {

    const result =
      await mysql.query<ResultSetHeader>(
        `
        INSERT INTO customer_care
        (
          user_id,
          subject,
          message
        )
        VALUES
        (
          ?,
          ?,
          ?
        )
        `,
        [
          data.userId,
          data.subject,
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

          subject,

          message,

          admin_reply AS adminReply,

          status,

          created_at AS createdAt,

          updated_at AS updatedAt

        FROM customer_care

        WHERE id = ?

        LIMIT 1
        `,
        [
          id,
        ],
      );

    return rows[0] ?? null;

  }

  async getUserTickets(
    userId: number,
  ) {

    return mysql.query<any[]>(
      `
      SELECT

        id,

        subject,

        status,

        created_at AS createdAt

      FROM customer_care

      WHERE user_id = ?

      ORDER BY created_at DESC
      `,
      [
        userId,
      ],
    );

  }

  async reply(
    id: number,
    reply: string,
    status: TicketStatus,
  ): Promise<void> {

    await mysql.query(
      `
      UPDATE customer_care

      SET

        admin_reply = ?,

        status = ?

      WHERE id = ?
      `,
      [
        reply,
        status,
        id,
      ],
    );

  }

}

export default new CustomerCareRepository();