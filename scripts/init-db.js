const { Client } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

async function runScript(client, filename) {
  const filePath = path.join(__dirname, filename);
  console.log(`Running ${filename}...`);
  const content = fs.readFileSync(filePath, "utf8");

  try {
    await client.query(content);
    console.log(`Successfully ran ${filename}`);
  } catch (error) {
    console.error(`Error running ${filename}:`, error);
  }
}

async function init() {
  const client = new Client(process.env.DATABASE_URL);

  try {
    await client.connect();

    // Order matters
    const scripts = [
      "01-create-tables.sql",
      "02-seed-data.sql",
      "03-add-new-tables.sql",
      "04-seed-additional-data.sql",
      "05-add-contact-messages.sql",
      "05-add-production-tables.sql",
    ];

    for (const script of scripts) {
      if (fs.existsSync(path.join(__dirname, script))) {
        await runScript(client, script);
      } else {
        console.warn(`Script ${script} not found, skipping.`);
      }
    }
    console.log("Database initialization completed.");
  } catch (error) {
    console.error("Initialization failed:", error);
  } finally {
    await client.end();
  }
}

init();
