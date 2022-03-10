import { AbstractBaseHandler } from "./handlers/abstract-base-handler";
import { ReportByStudentsHandler } from "./handlers/report-by-students.handler";

export enum EFileNames {
    ReportByStudents = 'report-by-students'
}

export const mapping: Array<{ name: EFileNames; handler: AbstractBaseHandler }> = [
    {
        name: EFileNames.ReportByStudents,
        handler: new ReportByStudentsHandler()
    }
];