import { Context } from "koa";
import { readFile } from "../../functions/ReadFile";
import { XMLParser as fxp } from "fast-xml-parser";
import path from "path";
import ReportDto from "./dtos/report.dto";

export default class ParserController {
  async read(ctx: Context) {
    try {
      const parser = new fxp();
      const { stringify } = JSON;
      const pathToFile = path.join(
        process.env.NODE_PATH,
        "/static/docs/report.xml"
      );
      const xml: string = await readFile(pathToFile);
      const json = parser.parse(xml);
      const dto = new ReportDto(json);
      // const table = xml.Workbook.Worksheet.Table.Row

      ctx.body = {
        path: pathToFile,
        dto: dto.transform({ skipTop: 3, skipBottom: 2 }).table,
        // xml: table,
        // file: stringify(file)
      };
    } catch (error) {
      console.log(error);
    }
  }
}
