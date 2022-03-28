export abstract class AbstractBaseHandler {
    abstract toJson(data: Record<string, any>): string;
    toXml?(data: Record<string, any>): string;
    toXlsx?(data: Record<string, any>): string;
}