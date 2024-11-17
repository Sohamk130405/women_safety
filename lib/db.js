import { createPool } from "mysql2/promise";

const db = createPool({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

export async function query(q, values = []) {
  try {
    const [results] = await db.query(q, values); // Destructure to get the results
    return results; // Return results
  } catch (e) {
    throw new Error(e.message); // Rethrow error with message
  }
}
