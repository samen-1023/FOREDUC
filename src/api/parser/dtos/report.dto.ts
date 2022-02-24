import R from "ramda";

interface TransfromParams {
  skipTop?: number;
  skipBottom?: number;
}

interface StudentsInfo {
  fullname: string;
  grade?: number;
}

interface DisciplinesInfo {
  discipline: string;
  students: StudentsInfo[];
}

export default class ReportDto {
  private file: any[];
  private report: DisciplinesInfo[];

  constructor(file: any) {
    this.file = file.Workbook.Worksheet.Table.Row;
  }

  transform(params: TransfromParams) {
    const transformed: DisciplinesInfo[] = [];

    if (params?.skipTop) this.file = R.drop(params.skipTop, this.file);
    if (params?.skipBottom)
      this.file = R.dropLast(params.skipBottom, this.file);

    return this;
  }

  get table() {
    return this.file;
  }
}
