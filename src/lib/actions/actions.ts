import type { InBlog, InSnippet, OutBlog } from "$lib/types/types"
import { toSQLDate } from "$lib/utils/sqlDate"

export async function GetBlogs(title: string): Promise<InBlog> {
    let myprom = await fetch('/api/blogs?' + new URLSearchParams({
        title: title
    }).toString())
    let data = await myprom.json()
    console.log(data)
    return data
}

export async function GetSnippets(title: string): Promise<InSnippet[]> {
    let myprom = await fetch('/api/snippets?' + new URLSearchParams({
        title: title
    }).toString())
    let data = await myprom.json()
    for (let i = 0; i < data.length; ++i) {
        let newTime = data[i].posted.replaceAll('T', ' ').split('.')[0]
        let t: any = newTime.split(/[- :]/);
        let dateObj = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
        let options: any = { year: 'numeric', month: 'long', day: 'numeric' };
        let finalStr = dateObj.toLocaleDateString("en-US", options)
        data[i].posted = finalStr
    }
    return data
}

export async function PostBlog(blog: OutBlog) {
    let sqlStr = ""
    if (blog.posted != "") sqlStr = toSQLDate(blog.posted)

    let snippetRes = await fetch("/api/snippets", {
        method: "POST",
        body: JSON.stringify({
            title: blog.title,
            summary: blog.summary,
            posted: sqlStr
        })
    })
    let blogRes = await fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify({
            title: blog.title,
            content: blog.content
        })
    })
    return [await snippetRes.json(), await blogRes.json()]
}

export async function DeleteBlog(title: string) {
    let myprom = await fetch('/api/snippets?' + new URLSearchParams({
        title: title
    }).toString(), {
        method: "DELETE"
    });
}

// https://restfulapi.net/http-methods/
// use query params for DELETE requests