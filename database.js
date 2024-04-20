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
  const result = await pool.query("SELECT * FROM notes");
  const rows = result[0];
  return rows;
}

// const results = await getNotes();
// console.log(results);

async function getNote(id) {
  const [rows] = await pool.query(
    `SELECT * FROM notes
      WHERE id = ?`,
    [id]
  );
  return rows[0];
}

const note = await getNote(1);
console.log(note);

// async funtion createNote(title, content)
// {
//     const [result] = await pool.query
//     (
//         `INSERT INTO notes (title, content)
//         VALUES (?, ?)`,
//         [title, content])
//         const id= result.insertId
//         return getNote(id)

// }
