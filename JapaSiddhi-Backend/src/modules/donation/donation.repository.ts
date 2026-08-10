import {
  ResultSetHeader,
} from 'mysql2';

import mysql from '../../database/mysql';


class DonationRepository {


  async create(
    data: {
      userId: number;
      donationType: string;
      amount: number;
      paymentMethod: string;
      transactionId?: string | null;
      paymentReference?: string | null;
      remarks?: string | null;
    },
  ): Promise<number> {


    const result =
      await mysql.query<ResultSetHeader>(
        `
        INSERT INTO donations
        (
          user_id,
          donation_type,
          amount,
          payment_method,
          transaction_id,
          payment_reference,
          donation_status,
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
          'SUCCESS',
          ?
        )
        `,
        [
          data.userId,
          data.donationType,
          data.amount,
          data.paymentMethod,
          data.transactionId ?? null,
          data.paymentReference ?? null,
          data.remarks ?? null,
        ],
      );


    return result.insertId;

  }



  async getHistory(
    userId: number,
  ) {


    return mysql.query<any[]>(
      `
      SELECT

        id,

        user_id AS userId,

        donation_type AS donationType,

        amount,

        payment_method AS paymentMethod,

        transaction_id AS transactionId,

        payment_reference AS paymentReference,

        donation_status AS donationStatus,

        donated_at AS donatedAt

      FROM donations

      WHERE user_id = ?

      ORDER BY donated_at DESC
      `,
      [
        userId,
      ],
    );

  }



  async getMonthlyStatus(
    userId: number,
  ) {


    const rows =
      await mysql.query<any[]>(
        `
        SELECT

          id,

          amount,

          donated_at

        FROM donations

        WHERE user_id = ?

        AND donation_type = 'MONTHLY'

        AND donation_status = 'SUCCESS'

        AND MONTH(donated_at) = MONTH(CURDATE())

        AND YEAR(donated_at) = YEAR(CURDATE())

        ORDER BY donated_at DESC

        LIMIT 1
        `,
        [
          userId,
        ],
      );


    return rows.length
      ? rows[0]
      : null;

  }



  async getPaymentSettings() {


    return mysql.query<any[]>(
      `
      SELECT

        setting_key,

        setting_value

      FROM app_settings

      WHERE category = 'DONATION'

      AND is_active = 1
      `,
    );

  }


}


export default new DonationRepository();