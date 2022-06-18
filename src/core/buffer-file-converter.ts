import * as xlsx from 'xlsx';
import { EDocumentMIMEType } from '../entity/common/enums';
import { XMLParser } from 'fast-xml-parser';
import * as fs from 'fs';

export class FileConverter {

  constructor(private path: string, private mimetype: EDocumentMIMEType) {
  }

  toJSON() {
    switch(this.mimetype) {
      case EDocumentMIMEType.xlsx:
      case EDocumentMIMEType.xls:
        return xlsx.readFile(this.path).Sheets;
      case EDocumentMIMEType.xml:
        return new XMLParser().parse(
          fs.readFileSync(this.path).toString(),
        );
      case EDocumentMIMEType.json:
        return JSON.parse(
          fs.readFileSync(this.path).toString()
        );
      default:
        throw new Error('MIMETYPE_IS_NOT_SUPPORTED');
    }
  }
}