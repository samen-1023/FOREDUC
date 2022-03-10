export abstract class AbstractBaseHandler {
    protected abstract toJson(data: Record<string, any>): string;
    toXml?(data: Record<string, any>): string;
    toXlsx?(data: Record<string, any>): string;
}