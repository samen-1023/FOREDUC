import { EFileNames } from "../../entity/common/enums";
import { AbstractBaseHandler } from "./handlers/abstract-base-handler";
import { ReportByStudentsHandler } from "./handlers/report-by-students.handler";



export const mapping: Array<{ name: EFileNames; handler: AbstractBaseHandler }> = [
    {
        name: EFileNames.ReportByStudents,
        handler: new ReportByStudentsHandler()
    }
];