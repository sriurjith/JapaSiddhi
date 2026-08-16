import mysql from '../../database/mysql';

class MantraRepository {
  async getActiveMantras() {
    return mysql.query<any[]>(
      `
      SELECT
        id,
        mantra_name AS mantraName,
        deity_name AS deityName,
        sanskrit_text AS sanskritText,
        transliteration,
        default_japa_count AS defaultJapaCount,
        image_url AS imageUrl,
        is_featured AS isFeatured
      FROM mantras
      WHERE is_active = 1
      ORDER BY display_order ASC
      `,
    );
  }
}

export default new MantraRepository();
