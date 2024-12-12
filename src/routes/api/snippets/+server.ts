import mysql, { type QueryResult, type RowDataPacket } from "mysql2";
import dotenv from "dotenv"
import { json, type RequestEvent } from "@sveltejs/kit";
import type { OutSnippet } from "$lib/types/types";
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


export async function GET(req: RequestEvent) {
    console.log("snippets got a GET request!")
    let title = req.url.searchParams.get("title")

    let sql = "SELECT * FROM blogsnippets ORDER BY posted DESC"
    if (title != "") sql = `SELECT * FROM blogsnippets WHERE title LIKE "%${title}%" ORDER BY posted DESC`

    const [result, fields] = await pool.query<BlogSnippet[]>(sql).then((res) => {
        return res;
    });
    return json(result);
}


export async function POST(req: RequestEvent) {
    console.log("snippets got a POST request!", req.constructor.name)
    const body: OutSnippet = await req.request.json();

    try {
        let sql = `INSERT INTO blogsnippets (title, summary) VALUES ("${body.title}", "${body.summary}")`;
        if (body.posted != "") sql = `INSERT INTO blogsnippets (title, summary, posted) VALUES ("${body.title}", "${body.summary}", "${body.posted}")`;
        const [result, fields] = await pool.query(sql);
        
        return json(result);
    } catch (err) {
        json(err);
    }
}


export async function DELETE(req: RequestEvent) {
    console.log("snippets got a DELETE request!")
    let title = req.url.searchParams.get("title")
    if (title == "") return json(0);

    let sql = `DELETE FROM blogsnippets WHERE title="${title}"`
    const [result, fields] = await pool.query(sql);
    return json(result);
}