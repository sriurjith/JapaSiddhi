import mysql from '../../database/mysql';

export interface OtpChallenge {
  id: number;
  mobileCountryCode: string;
  mobileNumber: string;
  sessionId: string;
  codeHash: string | null;
  expiresAt: number;
  attempts: number;
  createdAt: number;
}

class OtpRepository {
  async findActive(
    mobileCountryCode: string,
    mobileNumber: string,
  ): Promise<OtpChallenge | null> {
    const rows = await mysql.query<any[]>(
      `
      SELECT
        id,
        mobile_country_code AS mobileCountryCode,
        mobile_number AS mobileNumber,
        session_id AS sessionId,
        code_hash AS codeHash,
        expires_at AS expiresAt,
        attempts,
        created_at AS createdAt
      FROM otp_challenges
      WHERE mobile_country_code = ?
      AND mobile_number = ?
      ORDER BY id DESC
      LIMIT 1
      `,
      [mobileCountryCode, mobileNumber],
    );

    return rows[0] ?? null;
  }

  async save(data: {
    mobileCountryCode: string;
    mobileNumber: string;
    sessionId: string;
    codeHash?: string | null;
    expiresAt: number;
  }): Promise<void> {
    await mysql.query(
      `
      DELETE FROM otp_challenges
      WHERE mobile_country_code = ?
      AND mobile_number = ?
      `,
      [data.mobileCountryCode, data.mobileNumber],
    );

    await mysql.query(
      `
      INSERT INTO otp_challenges
      (
        mobile_country_code,
        mobile_number,
        session_id,
        code_hash,
        expires_at,
        attempts,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, 0, ?)
      `,
      [
        data.mobileCountryCode,
        data.mobileNumber,
        data.sessionId,
        data.codeHash ?? null,
        data.expiresAt,
        Date.now(),
      ],
    );
  }

  async incrementAttempts(id: number): Promise<void> {
    await mysql.query(
      `
      UPDATE otp_challenges
      SET attempts = attempts + 1
      WHERE id = ?
      `,
      [id],
    );
  }

  async delete(
    mobileCountryCode: string,
    mobileNumber: string,
  ): Promise<void> {
    await mysql.query(
      `
      DELETE FROM otp_challenges
      WHERE mobile_country_code = ?
      AND mobile_number = ?
      `,
      [mobileCountryCode, mobileNumber],
    );
  }
}

export default new OtpRepository();
