import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "041601",
  database: "capstone",
});
