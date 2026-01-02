// const { getMeals } = require("./app/actions/meals");
// We can't easily import TS server actions in a standalone JS script without ts-node and setup.
// Instead, I'll use the debug-db.js approach but try to replicate the query logic.

const { Client } = require("@neondatabase/serverless");
require("dotenv").config({ path: ".env.local" });

async function verifyQuery() {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();

  try {
    const query = `
      SELECT 
        m.*,
        c.name as category_name,
        COALESCE(AVG(r.rating), 0) as avg_rating,
        COUNT(DISTINCT r.id) as review_count
      FROM meals m
      LEFT JOIN categories c ON m.category_id = c.id
      LEFT JOIN reviews r ON m.id = r.meal_id
      WHERE m.is_available = true
      GROUP BY m.id, c.name
      ORDER BY review_count DESC
    `;

    const res = await client.query(query);
    console.log(`Fetched ${res.rows.length} meals.`);
    if (res.rows.length > 0) {
      console.log("First meal:", res.rows[0].name);
      console.log("Category:", res.rows[0].category_name);
    }
  } catch (err) {
    console.error("Query failed:", err);
  } finally {
    await client.end();
  }
}

verifyQuery();
