import type { RowDataPacket } from "mysql2";

export interface OutBlog {
    title: string;
    summary: string;
    content: string;
    posted: string;
}

export interface OutFullBlog {
    title: string;
    content: string;
}

export interface OutSnippet {
    title: string;
    summary: string;
    posted: string;
}

export interface InBlog extends RowDataPacket {
	id: number;
	title: string;
	content: string;
}

export interface InSnippet extends RowDataPacket {
    id: number;
    title: string;
    summary: string;
    posted: string;
}