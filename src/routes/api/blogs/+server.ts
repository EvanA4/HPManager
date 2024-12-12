import mysql, { type QueryResult, type RowDataPacket } from "mysql2";
import dotenv from "dotenv"
import { json, type RequestEvent } from "@sveltejs/kit";
import type { Blog, BlogRow } from "$lib/types/types.js";
dotenv.config()


var pool = mysql.createPool({
  host: process.env.MYSQL_URL,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_BASE
}).promise();


export async function GET(req: RequestEvent) {
	console.log("blogs got a GET request!");
    let title = req.url.searchParams.get("title");
	let strict = req.url.searchParams.get("strict") == "true";

	let sql = "SELECT * FROM Blogs ORDER BY postdate DESC"
	if (title != "" && !strict) sql = `SELECT * FROM Blogs WHERE title LIKE "%${title}%" ORDER BY postdate DESC`
	else if (title != "" && strict) sql = `SELECT * FROM Blogs WHERE title="${title}" ORDER BY postdate DESC`
	const [result, fields] = await pool.query<BlogRow[]>(sql);
	
	return json(result);
}


export async function POST(req: RequestEvent) {
	console.log("blogs got a POST request!")
    const body: Blog = await req.request.json();

	try {
		let sql = `INSERT INTO Blogs (title, summary, content, postdate) VALUES ("${body.title}", "${body.summary}", "${body.content}", "${body.postdate}")`;
		if (body.postdate == "") sql = `INSERT INTO Blogs (title, summary, content) VALUES ("${body.title}", "${body.summary}", "${body.content}")`;
		const [result, fields] = await pool.query(sql);
	} catch (err) {
		console.log(err);
	}

    return json(body);
}


export async function DELETE(req: RequestEvent) {
	console.log("blogs got a DELETE request!")
	let title = req.url.searchParams.get("title")
	if (title == "") return json(0);

	let sql = `DELETE FROM Blogs WHERE title="${title}"`
	const [result, fields] = await pool.query(sql);
	return json(result);
}


/*
'8', 'Whoa, a second title!', '<H1>Here is some content</H1>'


*/