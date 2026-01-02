const { Client } = require("@neondatabase/serverless");
require("dotenv").config({ path: ".env.local" });

async function debug() {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();
  
  try {
    const categories = await client.query("SELECT id, name FROM categories");
    console.log("Categories:", categories.rows);
    
    const meals = await client.query("SELECT id, name FROM meals");
    console.log("Meals:", meals.rows);
    
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

debug();
