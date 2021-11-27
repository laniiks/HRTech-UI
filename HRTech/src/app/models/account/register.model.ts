import { Guid } from "guid-typescript";

export interface IRegisterModel {
  email: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  phoneNumber: string;
  companyId: Guid;
  isDirector: boolean;
}
