import type { BlogRow, Blog, ExpRow } from "$lib/types/types"
import { toSQLDate } from "$lib/utils/sqlDate"


export async function GetExps(title: string, timeperiod: string, strict: boolean = false): Promise<Blog[]> {
    // get raw SQL rows for each blog
    let res = await fetch('/api/exp?' + new URLSearchParams({
        title: title,
        timeperiod: timeperiod,
        strict: (strict ? "true" : "false")
    }).toString());
    let rows: ExpRow[] = await res.json();
    let blogs: Exp[] = [];

    // simplify and convert each row into an exp object
    for (let i = 0; i < rows.length; ++i) {
        let bulletsArr = JSON.parse(rows[i].bullets);
        
        let blog: Exp = {
            title: rows[i].title,
            summary: rows[i].summary,
            content: rows[i].content,
            postdate: finalStr,
        };

        blogs.push(blog);
    }

    return blogs;
}


export async function DeleteExp(title: string): Promise<boolean> {
    // make DELETE request
    let res = await fetch('/api/blogs?' + new URLSearchParams({
        title: title
    }).toString(), {
        method: "DELETE"
    });

    // return success or failure
    let rawres = await res.json();
    if (!rawres) {
        console.log(`Error: failed to delete blog \"${title}\".`);
        return false;
    }
    return true;
}


export async function PostExp(blog: Blog): Promise<boolean> {
    // delete blog if already exists
    let blogCheck = await GetExps(blog.title, true);
    if (blogCheck.length > 0) {
        console.log("Warning: blog already exists, replacing existing blog.");
        await DeleteExp(blog.title);
    }

    // determine proper SQL TimeStamp string
    let sqlStr = "";
    if (blog.postdate != "") sqlStr = toSQLDate(blog.postdate);

    // make actual POST request
    let res = await fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify({
            title: blog.title,
            summary: blog.summary,
            content: blog.content,
            postdate: sqlStr
        })
    });

    // return success or failure
    let rawres = await res.json();
    if (!rawres) {
        console.log(`Error: failed to post blog \"${blog.title}\".`);
        return false;
    }
    return true;
}