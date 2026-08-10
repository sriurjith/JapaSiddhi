import pool from './pool';

class MySQL {
 async query<T = any>(
  sql: string,
  params: any[] = [],
): Promise<T> {

  const [rows] = await pool.execute(
    sql,
    params,
  );

  return rows as T;

}

  async transaction(callback: any) {
    const connection =
      await pool.getConnection();

    try {
      await connection.beginTransaction();

      const result = await callback(
        connection,
      );

      await connection.commit();

      return result;
    } catch (error) {
      await connection.rollback();

      throw error;
    } finally {
      connection.release();
    }
  }
}

export default new MySQL();