import {
  BeforeInsert,
  CreateDateColumn,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class BasicEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt?: string;

  @BeforeInsert()
  changeUpdateDate() {
    this.updatedAt = this.createdAt;
  }
}
