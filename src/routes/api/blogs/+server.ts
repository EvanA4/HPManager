import mysql, { type QueryResult, type RowDataPacket } from "mysql2";
import dotenv from "dotenv"
import { json } from "@sveltejs/kit";
import type { InBlog, OutFullBlog } from "$lib/types/types.js";
dotenv.config()


var pool = mysql.createPool({
  host: process.env.MYSQL_URL,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_BASE
}).promise();


export async function GET(req) {
	console.log("blogs got a GET request!")
    let title = req.url.searchParams.get("title")
	if (title == "") {
		return json([])
	}

	let sql = `SELECT * FROM fullblogs WHERE title="${title}"`
	const [result, fields] = await pool.query<InBlog[]>(sql);
	
	return json(result);
}


export async function POST(req) {
	console.log("blogs got a POST request!")
    const body: OutFullBlog = await req.request.json();

	try {
		const sql = `INSERT INTO fullblogs (title, content) VALUES ("${body.title}", "${body.content}")`;
		const [result, fields] = await pool.query(sql);
	} catch (err) {
		// console.log(err);
	}

    return json(body);
}

/*
'8', 'Whoa, a second title!', '<H1>Here is some content</H1>'


*/