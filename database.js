import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getNotes() {
  try {
    const result = await pool.query("SELECT * FROM notes");
    const rows = result[0];
    return rows;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
}

async function getNote(id) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM notes
        WHERE id = ?`,
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error(`Error fetching note with id ${id}:`, error);
    throw error;
  }
}

async function createNote(title, content) {
  try {
    const [result] = await pool.query(
      `INSERT INTO notes (title, content)
        VALUES (?, ?)`,
      [title, content]
    );
    const id = result.insertId;
    return getNote(id);
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
}

export { createNote, getNote, getNotes };
