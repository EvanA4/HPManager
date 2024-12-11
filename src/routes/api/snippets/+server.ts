import mysql, { type QueryResult, type RowDataPacket } from "mysql2";
import dotenv from "dotenv"
import { json } from "@sveltejs/kit";
dotenv.config()


var pool = mysql.createPool({
  host: process.env.MYSQL_URL,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_BASE
}).promise();


interface BlogSnippet extends RowDataPacket {
    id: number;
    title: string;
    summary: string;
    posted: object;
}


export async function GET() {
    const something = await pool.query<BlogSnippet[]>("SELECT * FROM blogsnippets").then((res) => {
        return res;
    });
    return json(something);
}