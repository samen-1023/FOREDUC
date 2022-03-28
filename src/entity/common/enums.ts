export enum ERoles {
    All = 'all',
    Admin = 'admin',
    Curator = 'curator',
    Educator = 'educator',
    Supervisor = 'supervisor'
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