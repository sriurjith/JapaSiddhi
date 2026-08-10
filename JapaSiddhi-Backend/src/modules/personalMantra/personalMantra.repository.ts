import { ResultSetHeader } from 'mysql2';

import mysql from '../../database/mysql';


class PersonalMantraRepository {


  async create(
    userId: number,
    data: {
      mantraName: string;
      deityName?: string | null;
      mantraText: string;
      transliteration?: string | null;
      preferredJapaCount: number;
      imageUrl?: string | null;
      audioUrl?: string | null;
    },
  ): Promise<number> {


    const result =
      await mysql.query<ResultSetHeader>(
        `
        INSERT INTO user_personal_mantras
        (
          user_id,
          mantra_name,
          deity_name,
          mantra_text,
          transliteration,
          preferred_japa_count,
          image_url,
          audio_url
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
          ?
        )
        `,
        [
          userId,
          data.mantraName,
          data.deityName ?? null,
          data.mantraText,
          data.transliteration ?? null,
          data.preferredJapaCount,
          data.imageUrl ?? null,
          data.audioUrl ?? null,
        ],
      );


    return result.insertId;

  }



  async findAll(
    userId: number,
  ) {


    return mysql.query<any[]>(
      `
      SELECT

        id,

        user_id AS userId,

        mantra_name AS mantraName,

        deity_name AS deityName,

        mantra_text AS mantraText,

        transliteration,

        preferred_japa_count AS preferredJapaCount,

        image_url AS imageUrl,

        audio_url AS audioUrl,

        is_favorite AS isFavorite,

        is_active AS isActive,

        created_at AS createdAt,

        updated_at AS updatedAt

      FROM user_personal_mantras

      WHERE user_id = ?

      AND is_active = 1

      ORDER BY created_at DESC
      `,
      [
        userId,
      ],
    );

  }



  async findById(
    id: number,
    userId: number,
  ) {


    const rows =
      await mysql.query<any[]>(
        `
        SELECT *

        FROM user_personal_mantras

        WHERE id = ?

        AND user_id = ?

        AND is_active = 1

        LIMIT 1
        `,
        [
          id,
          userId,
        ],
      );


    return rows.length
      ? rows[0]
      : null;

  }



  async update(
    id: number,
    userId: number,
    data: any,
  ): Promise<void> {


    await mysql.query(
      `
      UPDATE user_personal_mantras

      SET

        mantra_name = COALESCE(?, mantra_name),

        deity_name = COALESCE(?, deity_name),

        mantra_text = COALESCE(?, mantra_text),

        transliteration = COALESCE(?, transliteration),

        preferred_japa_count = COALESCE(?, preferred_japa_count),

        image_url = COALESCE(?, image_url),

        audio_url = COALESCE(?, audio_url),

        is_favorite = COALESCE(?, is_favorite)

      WHERE id = ?

      AND user_id = ?
      `,
      [
        data.mantraName ?? null,
        data.deityName ?? null,
        data.mantraText ?? null,
        data.transliteration ?? null,
        data.preferredJapaCount ?? null,
        data.imageUrl ?? null,
        data.audioUrl ?? null,
        data.isFavorite ?? null,
        id,
        userId,
      ],
    );

  }



  async delete(
    id: number,
    userId: number,
  ): Promise<void> {


    await mysql.query(
      `
      UPDATE user_personal_mantras

      SET is_active = 0

      WHERE id = ?

      AND user_id = ?
      `,
      [
        id,
        userId,
      ],
    );

  }


}


export default new PersonalMantraRepository();