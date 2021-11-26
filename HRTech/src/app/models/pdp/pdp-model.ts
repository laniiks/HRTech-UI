import { Guid } from "guid-typescript";

export interface IPdpModel {
    id: Guid;
    createdDateTime: Date;
    title: string;
    fileGuid: Guid;
    fileName: string;
    fileType: string;
    content: string;
}