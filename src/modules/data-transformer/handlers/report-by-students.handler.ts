import { AbstractBaseHandler } from "./abstract-base-handler";

export class ReportByStudentsHandler extends AbstractBaseHandler {
    toJson(data: Record<string, any>): string {
        return JSON.stringify(data);
    }
}