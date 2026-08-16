import {
  ResultSetHeader,
} from 'mysql2';

import mysql from '../../database/mysql';

import {
  UpdateProfileRequest,
} from './profile.types';



class ProfileRepository {


  async getProfile(
    userId: number,
  ) {


    const rows =
      await mysql.query<any[]>(
        `
        SELECT

          u.id,

          u.firebase_uid AS firebaseUid,

          u.mobile_number AS mobileNumber,

          u.full_name AS fullName,

          u.email,

          u.gender,

          u.date_of_birth AS dateOfBirth,


          u.country_id AS countryId,

          c.name AS countryName,


          u.state_id AS stateId,

          s.name AS stateName,


          u.city_id AS cityId,

          ci.name AS cityName,


          u.preferred_language_id AS preferredLanguageId,

          l.name AS preferredLanguageName,


          u.profile_photo AS profilePhoto,

          u.address,

          u.marital_status AS maritalStatus,

          u.spouse_name AS spouseName,

          u.spouse_dob AS spouseDob,

          u.anniversary_date AS anniversaryDate,

          u.gothram,

          u.nakshatram,

          u.profile_completed AS profileCompleted,

          u.role


        FROM users u


        LEFT JOIN countries c
        ON u.country_id = c.id


        LEFT JOIN states s
        ON u.state_id = s.id


        LEFT JOIN cities ci
        ON u.city_id = ci.id


        LEFT JOIN languages l
        ON u.preferred_language_id = l.id


        WHERE u.id = ?

        AND u.deleted_at IS NULL

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





  async updateProfile(
    userId: number,

    data: UpdateProfileRequest,

  ): Promise<void> {


    await mysql.query<ResultSetHeader>(
      `
      UPDATE users

      SET


        full_name =
        COALESCE(?, full_name),


        email =
        COALESCE(?, email),


        gender =
        COALESCE(?, gender),


        date_of_birth =
        COALESCE(?, date_of_birth),


        country_id =
        COALESCE(?, country_id),


        state_id =
        COALESCE(?, state_id),


        city_id =
        COALESCE(?, city_id),


        preferred_language_id =
        COALESCE(?, preferred_language_id),


        profile_photo =
        COALESCE(?, profile_photo),


        profile_completed = 1,


        updated_at =
        CURRENT_TIMESTAMP


      WHERE id = ?

      AND deleted_at IS NULL

      `,
      [

        data.fullName ?? null,

        data.email ?? null,

        data.gender ?? null,

        data.dateOfBirth ?? null,

        data.countryId ?? null,

        data.stateId ?? null,

        data.cityId ?? null,

        data.preferredLanguageId ?? null,

        data.profilePhoto ?? null,

        userId,

      ],
    );

  }



}


export default new ProfileRepository();