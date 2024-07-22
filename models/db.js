import mysql from 'mysql2'
//database configuration 

 let pool = mysql
  .createPool({
    host: "localhost",
    user: "localuser",
    database: "testdatabaselocal",
    password: "pikaP!",
    connectionLimit: 10,
  })
  .promise();


  async function cleanup() {
  await pool.end();
}

export {pool, cleanup}

