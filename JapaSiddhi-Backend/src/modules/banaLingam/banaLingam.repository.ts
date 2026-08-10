import {
  ResultSetHeader,
} from 'mysql2';

import mysql from '../../database/mysql';

import {
  BanaLingamRequestStatus,
  CreateBanaLingamRequest,
} from './banaLingam.types';

class BanaLingamRepository {

  async create(
    data: CreateBanaLingamRequest,
  ): Promise<number> {

    const result =
      await mysql.query<ResultSetHeader>(
        `
        INSERT INTO bana_lingam
        (
          user_id,
          order_id,
          full_name,
          mobile,
          email,
          address,
          city_id,
          state_id,
          country_id,
          postal_code,
          gothram,
          nakshatram,
          quantity,
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
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        )
        `,
        [
          data.userId,
          data.orderId ?? null,
          data.fullName,
          data.mobile,
          data.email ?? null,
          data.address,
          data.cityId,
          data.stateId,
          data.countryId,
          data.postalCode,
          data.gothram ?? null,
          data.nakshatram ?? null,
          data.quantity,
          data.remarks ?? null,
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

          order_id AS orderId,

          full_name AS fullName,

          mobile,

          email,

          address,

          city_id AS cityId,

          state_id AS stateId,

          country_id AS countryId,

          postal_code AS postalCode,

          gothram,

          nakshatram,

          quantity,

          request_status AS requestStatus,

          remarks,

          created_at AS createdAt,

          updated_at AS updatedAt

        FROM bana_lingam

        WHERE id = ?

        LIMIT 1
        `,
        [
          id,
        ],
      );

    return rows[0] ?? null;

  }

  async getUserRequests(
    userId: number,
  ) {

    return mysql.query<any[]>(
      `
      SELECT

        id,

        order_id AS orderId,

        full_name AS fullName,

        quantity,

        request_status AS requestStatus,

        created_at AS createdAt

      FROM bana_lingam

      WHERE user_id = ?

      ORDER BY created_at DESC
      `,
      [
        userId,
      ],
    );

  }

  async updateStatus(
    id: number,
    status: BanaLingamRequestStatus,
    remarks?: string | null,
  ): Promise<void> {

    await mysql.query(
      `
      UPDATE bana_lingam

      SET

        request_status = ?,

        remarks = ?

      WHERE id = ?
      `,
      [
        status,
        remarks ?? null,
        id,
      ],
    );

  }

}

export default new BanaLingamRepository();