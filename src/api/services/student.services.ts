import { Student } from './../../entity/student';
import { AbstractBaseService } from "../../core/abstract-base-service";

export class StudentService extends AbstractBaseService<Student> {
  constructor() {
      super(Student);
  }
}