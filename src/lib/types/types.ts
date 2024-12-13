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


export interface ExpRow extends RowDataPacket {
    id: number;
    title: string;
    link: string;
    timeperiod: string;
    bullets: string;
}


export interface Exp {
    title: string;
    link: string;
    timeperiod: string;
    bullets: string;
}