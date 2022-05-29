import * as multer from '@koa/multer';
import * as xlsx from 'xlsx';
import { EDocumentMIMEType } from '../entity/common/enums';
import { XMLParser } from 'fast-xml-parser';

export class BufferFileConverter {
  private buffer: Buffer;

  constructor(private file: multer.File) {
    this.buffer = file.buffer;
  }

  toJSON() {
    switch(this.file.mimetype) {
      case EDocumentMIMEType.xlsx:
      case EDocumentMIMEType.xls:
        return this.xlsxBufferToJson();
      case EDocumentMIMEType.xml:
        const parser = new XMLParser();
        const json = parser.parse(this.buffer.toString());
        return json.Workbook.Worksheet.Table.Row;
      case EDocumentMIMEType.json:
        return JSON.parse(this.buffer.toString());
    }
  }

  protected xlsxBufferToJson() {
    return xlsx.read(this.buffer);
  }
}