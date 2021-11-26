import { Guid } from "guid-typescript";
import { IUserModel } from "../account/user.model";
import { IGradeModel } from "../grade/grade-model";


export interface IEvaluationModel{
    evaluation: {
        id: Guid;
        createdDateTime: Date;
        applicationUserId: string;
        applicationUsers: IUserModel;
        applicationUserIdExpertSoftSkills: string;
        applicationUserExpertSoftSkills: IUserModel;
        applicationUserIdExpertHardSkills: string;
        applicationUserExpertHardSkills: IUserModel;
        applicationUserIdExpertEnglishSkills: string;
        applicationUserExpertEnglishSkills: IUserModel;
        evaluationState: number;
        dateOfEvaluation: Date;
        currentGradeId: number;
        currentGrade: IGradeModel;
        nextGradeId: number;
        nextGrade: IGradeModel;
        softSkillSuccess: number;
        hardSkillSuccess: number;
        englishSkillSuccess: number;
    }[]
}

export interface ICreateEvaluationModel{
    applicationUserIdExpertSoftSkills: string;
    applicationUserIdExpertHardSkills: string;
    applicationUserIdExpertEnglishSkills: string;
    dateOfEvaluation: Date;
}
export interface IEvaluationModelGetById{
        id: Guid;
        createdDateTime: Date;
        applicationUserId: string;
        applicationUsers: IUserModel;
        applicationUserIdExpertSoftSkills: string;
        applicationUserExpertSoftSkills: IUserModel;
        applicationUserIdExpertHardSkills: string;
        applicationUserExpertHardSkills: IUserModel;
        applicationUserIdExpertEnglishSkills: string;
        applicationUserExpertEnglishSkills: IUserModel;
        evaluationState: number;
        dateOfEvaluation: Date;
        currentGradeId: number;
        currentGrade: IGradeModel;
        nextGradeId: number;
        nextGrade: IGradeModel;
        softSkillSuccess: number;
        hardSkillSuccess: number;
        englishSkillSuccess: number;
}