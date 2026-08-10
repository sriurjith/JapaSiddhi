import pool from './pool';

export const testDatabase = async () => {
  try {
    const connection =
      await pool.getConnection();

    console.log(
      '✅ MySQL Connected Successfully',
    );

    connection.release();
  } catch (error) {
    console.error(
      '❌ MySQL Connection Failed',
    );

    console.error(error);
  }
};