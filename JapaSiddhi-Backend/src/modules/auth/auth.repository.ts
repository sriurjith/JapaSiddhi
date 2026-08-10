import { ResultSetHeader } from 'mysql2';
import mysql from '../../database/mysql';
import { AuthUser } from './auth.types';

interface CreateUserData {
  firebaseUid: string;
  mobileCountryCode: string;
  mobileNumber: string;

  deviceType: 'ANDROID' | 'IOS';

  deviceModel?: string;
  deviceOs?: string;
  appVersion?: string;
  firebaseToken?: string;
}

class AuthRepository {
  async findUserByFirebaseUid(
    firebaseUid: string,
  ): Promise<AuthUser | null> {
    const rows = await mysql.query<AuthUser[]>(
      `
      SELECT *
      FROM users
      WHERE firebase_uid = ?
      AND deleted_at IS NULL
      LIMIT 1
      `,
      [firebaseUid],
    );

    return rows.length > 0 ? rows[0] : null;
  }

  async findUserByMobile(
    mobileCountryCode: string,
    mobileNumber: string,
  ): Promise<AuthUser | null> {
    const rows = await mysql.query<AuthUser[]>(
      `
      SELECT *
      FROM users
      WHERE mobile_country_code = ?
      AND mobile_number = ?
      AND deleted_at IS NULL
      LIMIT 1
      `,
      [
        mobileCountryCode,
        mobileNumber,
      ],
    );

    return rows.length > 0 ? rows[0] : null;
  }

  async findUserById(
    id: number,
  ): Promise<AuthUser | null> {
    const rows = await mysql.query<AuthUser[]>(
      `
      SELECT *
      FROM users
      WHERE id = ?
      AND deleted_at IS NULL
      LIMIT 1
      `,
      [id],
    );

    return rows.length > 0 ? rows[0] : null;
  }

  async createUser(
    data: CreateUserData,
  ): Promise<number> {
    const result =
      await mysql.query<ResultSetHeader>(
        `
        INSERT INTO users
        (
          firebase_uid,
          mobile_country_code,
          mobile_number,
          device_type,
          device_model,
          device_os,
          app_version,
          firebase_token,
          profile_completed
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
          0
        )
        `,
        [
          data.firebaseUid,
          data.mobileCountryCode,
          data.mobileNumber,
          data.deviceType,
          data.deviceModel ?? null,
          data.deviceOs ?? null,
          data.appVersion ?? null,
          data.firebaseToken ?? null,
        ],
      );

    return result.insertId;
  }

  async updateLastLogin(
    userId: number,
    firebaseToken?: string,
    deviceModel?: string,
    deviceOs?: string,
    appVersion?: string,
  ): Promise<void> {
    await mysql.query<ResultSetHeader>(
      `
      UPDATE users
      SET
        firebase_token = ?,
        device_model = ?,
        device_os = ?,
        app_version = ?,
        last_login_at = NOW()
      WHERE id = ?
      `,
      [
        firebaseToken ?? null,
        deviceModel ?? null,
        deviceOs ?? null,
        appVersion ?? null,
        userId,
      ],
    );
  }

  async completeProfile(
    userId: number,
    data: {
      fullName: string;
      email?: string;
      gender: string;
      dateOfBirth: string;
      countryId: number;
      stateId: number;
      cityId: number;
      preferredLanguageId: number;
      profilePhoto?: string;
    },
  ): Promise<void> {
    await mysql.query<ResultSetHeader>(
      `
      UPDATE users
      SET
        full_name = ?,
        email = ?,
        gender = ?,
        date_of_birth = ?,
        country_id = ?,
        state_id = ?,
        city_id = ?,
        preferred_language_id = ?,
        profile_photo = ?,
        profile_completed = 1
      WHERE id = ?
      `,
      [
        data.fullName,
        data.email ?? null,
        data.gender,
        data.dateOfBirth,
        data.countryId,
        data.stateId,
        data.cityId,
        data.preferredLanguageId,
        data.profilePhoto ?? null,
        userId,
      ],
    );
  }
}

export default new AuthRepository();