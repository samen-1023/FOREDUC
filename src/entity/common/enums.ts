export enum ERoles {
    All = 'all',
    Admin = 'admin',
    Curator = 'curator',
    Educator = 'educator',
    Supervisor = 'supervisor',
    Public = 'public',
}

export enum EDocType {
    // В случае, если тип документа не входит в стандартные
    Any = 'any',
    // Отчёт
    Report = 'report',
    // Ведомость
    Statement = 'statement'
}

export enum EExtention {
    Json = '.json',
    Xml = '.xml',
    Xlsx = '.xlsx'
}

export enum EDepartment {
    Any = 'any',
    It = 'it'
}

export enum EFileNames {
    ReportByStudents = 'report-by-students'
}

export enum EDocumentMIMEType {
  xlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xls = 'application/vnd.ms-excel',
  xml = 'application/xml',
  json = 'application/json',

  // пока не пускать
  doc = 'application/msword',
  // пока не пускать
  docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}