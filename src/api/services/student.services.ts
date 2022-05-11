import { Student } from './../../entity/student';
import { AbstractBaseService } from "../../core/abstract-base-service";
import { BaseFilters } from '../../entity/common/types';

export class StudentService extends AbstractBaseService<Student> {
  constructor() {
    super(Student);
  }
}