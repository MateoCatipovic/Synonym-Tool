import sqlite3 from "better-sqlite3";
import path from "path";

// Initialize and create the SQLite database
const db = sqlite3(path.resolve(process.cwd(), "db", "synonyms.db"));

// Create necessary tables (if not already present)
db.exec(`
  CREATE TABLE IF NOT EXISTS synonyms (
    word TEXT PRIMARY KEY,
    groupId TEXT
  );
  CREATE TABLE IF NOT EXISTS groups (
    groupId TEXT PRIMARY KEY,
    synonyms TEXT
  );
`);

export default db;
