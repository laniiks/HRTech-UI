import { Guid } from "guid-typescript";
import { IUserModel } from "../account/user.model";
import { IAddressModel } from "../address/address-model";
import { IGradeModel } from "../grade/grade-model";
import { IFileModel } from "../photo/file-model";

export interface ICreateCompany {
    companyName: string;
    description: string;
    address: IAddressModel;
    createdDateTime: Date;
    image: IFileModel;
    excelFileUsers: IFileModel;
    grades: Array<ListGrades>;
}

export interface ListGrades{
    title: string;
}

export interface ICompanyModel {
    id: Guid;
    createdDateTime: Date;
    updateDateTime: Date;
    companyName: string;
    description: string;
    state: number;
    employees: Array<IUserModel>;
    image: IFileModel;
    address: IAddressModel;
    excelFileUsers: IFileModel;
    gradesCollection: Array<IGradeModel>;
}