import { ObjectId } from "mongodb";
import {
  BeforeInsert,
  CreateDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class BasicEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt?: string;

  @BeforeInsert()
  changeUpdateDate() {
    this.updatedAt = this.createdAt;
  }
}
