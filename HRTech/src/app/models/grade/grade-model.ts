import { Guid } from "guid-typescript";

export interface IGradeModel{
    id: number;
    createdDateTime: Date;
    title: string;
    companyId: Guid;
}
export interface IGradeModelId{
    id: number
}