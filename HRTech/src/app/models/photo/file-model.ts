import { Guid } from "guid-typescript";

export interface IFileModel {
  id?: number;
  fileGuid: Guid;
  fileName: string;
  fileType: string;
  content: string;
}
