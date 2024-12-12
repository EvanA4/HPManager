import type { RowDataPacket } from "mysql2";

export interface BlogRow extends RowDataPacket {
    id: number;
    title: string;
    summary: string;
    content: string;
    postdate: string;
}


export interface Blog {
    title: string;
    summary: string;
    content: string;
    postdate: string;
}


// old stuff
// export interface OutBlog {
//     title: string;
//     summary: string;
//     content: string;
//     posted: string;
// }

// export interface OutFullBlog {
//     title: string;
//     content: string;
// }

// export interface OutSnippet {
//     title: string;
//     summary: string;
//     posted: string;
// }

// export interface InBlog extends RowDataPacket {
// 	id: number;
// 	title: string;
// 	content: string;
// }

// export interface InSnippet extends RowDataPacket {
//     id: number;
//     title: string;
//     summary: string;
//     posted: string;
// }