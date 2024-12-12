import type { BlogRow, Blog } from "$lib/types/types"
import { toSQLDate } from "$lib/utils/sqlDate"


export async function GetBlogs(title: string, strict: boolean = false): Promise<Blog[]> {
    // get raw SQL rows for each blog
    let myprom = await fetch('/api/blogs?' + new URLSearchParams({
        title: title,
        strict: (strict ? "true" : "false")
    }).toString())
    let rows: BlogRow[] = await myprom.json()
    let blogs: Blog[] = []

    // simplify and convert each row into a blog object
    for (let i = 0; i < rows.length; ++i) {
        let newTime = rows[i].postdate.replaceAll('T', ' ').split('.')[0];
        let t: any = newTime.split(/[- :]/);
        let dateObj = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
        let options: any = { year: 'numeric', month: 'long', day: 'numeric' };
        let finalStr = dateObj.toLocaleDateString("en-US", options);
        
        let blog: Blog = {
            title: rows[i].title,
            summary: rows[i].summary,
            content: rows[i].content,
            postdate: finalStr,
        };

        blogs.push(blog);
    }

    return blogs;
}


export async function DeleteBlog(title: string) {
    let myprom = await fetch('/api/blogs?' + new URLSearchParams({
        title: title
    }).toString(), {
        method: "DELETE"
    });
}


export async function PostBlog(blog: Blog) {
    let blogCheck = await GetBlogs(blog.title, true);
    if (blogCheck.length > 0) {
        await DeleteBlog(blog.title);
    }

    let sqlStr = ""
    if (blog.postdate != "") sqlStr = toSQLDate(blog.postdate)

    let postRes = await fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify({
            title: blog.title,
            summary: blog.summary,
            content: blog.content,
            postdate: sqlStr
        })
    })
    return postRes.json()
}


// https://restfulapi.net/http-methods/
// use query params for DELETE requests