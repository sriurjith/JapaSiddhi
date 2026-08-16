import {
  ResultSetHeader,
} from 'mysql2';

import mysql from '../../database/mysql';



class FamilyRepository {


  async createFamily(
    data: {
      userId: number;
      familyName: string;
      description?: string | null;
    },
  ): Promise<number> {


    const result =
      await mysql.query<ResultSetHeader>(
        `
        INSERT INTO family_groups
        (
          user_id,
          family_name,
          description
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
          data.familyName,
          data.description ?? null,
        ],
      );


    return result.insertId;

  }



  async searchUserByMobile(
    mobileNumber: string,
  ) {


    const rows =
      await mysql.query<any[]>(
        `
        SELECT

          id,

          full_name AS fullName,

          mobile_number AS mobileNumber,

          profile_image AS profileImage

        FROM users

        WHERE mobile_number = ?

        AND deleted_at IS NULL

        LIMIT 1
        `,
        [
          mobileNumber,
        ],
      );


    return rows.length
      ? rows[0]
      : null;

  }



  async addMember(
    data: {
      familyId: number;
      userId?: number | null;
      memberName: string;
      relation: string;
      mobileNumber?: string | null;
      email?: string | null;
    },
  ): Promise<number> {


    const result =
      await mysql.query<ResultSetHeader>(
        `
        INSERT INTO family_members
        (
          family_id,
          user_id,
          member_name,
          relation,
          mobile_number,
          email
        )
        VALUES
        (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        )
        `,
        [
          data.familyId,
          data.userId ?? null,
          data.memberName,
          data.relation,
          data.mobileNumber ?? null,
          data.email ?? null,
        ],
      );


    return result.insertId;

  }



  async createInvitation(
    data: {
      familyId: number;
      invitedByUserId: number;
      invitedUserId?: number | null;
      mobileNumber: string;
      sentVia: 'APP' | 'SMS';
      inviteCode: string;
    },
  ): Promise<number> {


    const result =
      await mysql.query<ResultSetHeader>(
        `
        INSERT INTO family_invitations
        (
          family_id,
          invited_by_user_id,
          invited_user_id,
          invited_mobile_number,
          sent_via,
          invite_code,
          status
        )
        VALUES
        (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          'PENDING'
        )
        `,
        [
          data.familyId,
          data.invitedByUserId,
          data.invitedUserId ?? null,
          data.mobileNumber,
          data.sentVia,
          data.inviteCode,
        ],
      );


    return result.insertId;

  }



  async getInvitation(
    id: number,
  ) {


    const rows =
      await mysql.query<any[]>(
        `
        SELECT

          *

        FROM family_invitations

        WHERE id = ?

        LIMIT 1
        `,
        [
          id,
        ],
      );


    return rows.length
      ? rows[0]
      : null;

  }



  async acceptInvitation(
    invitationId: number,
  ): Promise<void> {


    await mysql.query(
      `
      UPDATE family_invitations

      SET

        status = 'ACCEPTED'

      WHERE id = ?
      `,
      [
        invitationId,
      ],
    );

  }



  async getFamily(
    userId: number,
  ) {


    const rows =
      await mysql.query<any[]>(
        `
        SELECT

          f.id,

          f.user_id AS userId,

          f.family_name AS familyName,

          f.description,

          f.created_at AS createdAt

        FROM family_groups f

        WHERE f.user_id = ?

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



  async getMembers(
    familyId: number,
  ) {


    return mysql.query<any[]>(
      `
      SELECT

        fm.id,

        fm.family_id AS familyId,

        fm.user_id AS userId,

        fm.member_name AS memberName,

        fm.relation,

        fm.mobile_number AS mobileNumber,

        fm.email,

        u.profile_image AS profileImage,

        COALESCE(SUM(js.session_count), 0) AS totalJapaCount

      FROM family_members fm

      LEFT JOIN users u
        ON u.id = fm.user_id

      LEFT JOIN japa_sessions js
        ON js.user_id = fm.user_id

      WHERE fm.family_id = ?

      GROUP BY fm.id

      ORDER BY totalJapaCount DESC
      `,
      [
        familyId,
      ],
    );

  }



  async getFamilyTodayCount(
    familyId: number,
  ) {


    const rows =
      await mysql.query<any[]>(
        `
        SELECT

          COALESCE(
            SUM(js.session_count),
            0
          ) AS todayJapaCount

        FROM family_members fm

        JOIN japa_sessions js
          ON js.user_id = fm.user_id

        WHERE fm.family_id = ?

        AND DATE(js.created_at)=CURDATE()
        `,
        [
          familyId,
        ],
      );


    return Number(rows[0]?.todayJapaCount ?? 0) || 0;

  }


}


export default new FamilyRepository();