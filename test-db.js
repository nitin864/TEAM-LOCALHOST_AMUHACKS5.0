// test-db.js
const { neon } = require("@neondatabase/serverless");
require("dotenv").config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL);

async function testConnection() {
  try {
    console.log("Testing database connection...");
    console.log("DATABASE_URL:", process.env.DATABASE_URL ? "✅ Found" : "❌ Not found");
    
    const result = await sql`SELECT version()`;
    console.log("✅ Database connected successfully!");
    console.log("PostgreSQL version:", result[0].version);
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
  }
}

testConnection();