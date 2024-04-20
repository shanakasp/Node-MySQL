import dotenv from "dotenv";
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

async function getNote(id) {
  const [rows] = await pool.query;
  {
    `SELECT * FROM notes
        WHERE id = ?`,
      [id];
  }
  return rows[0];
}

async funtion createNote(title, content) 
{
    const [result] = await pool.query
    (
        `INSERT INTO notes (title, content) 
        VALUES (?, ?)`,
        [title, content])
        const id= result.insertId
        return getNote(id)
    
}

const results = await createNote('test', 'test');
console.log(results);
