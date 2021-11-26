import { Guid } from "guid-typescript";
import { IFileModel } from "../photo/file-model";

export interface IUserModel {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  pnoneNumber: string;
  gradeId: number;
  companyId: Guid;
  expertUserState: number;
  isDirector: boolean;
  photo: IFileModel;
}

