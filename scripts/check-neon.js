const { neon } = require("@neondatabase/serverless");
require("dotenv").config({ path: ".env.local" });

async function checkSql() {
  const sql = neon(process.env.DATABASE_URL);
  console.log("Type of sql:", typeof sql);
  console.log("Has .query?:", typeof sql.query);
  
  try {
     // Try usage suggested by error
     // const res = await sql.query("SELECT 1 as val", []); // If this works
     // console.log("sql.query result:", res);
  } catch (e) {
      console.log("sql.query failed:", e.message);
  }
}

checkSql();
