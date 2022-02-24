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

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp with time zone", nullable: true })
  updatedAt?: string;

  @BeforeInsert()
  changeUpdateDate() {
    this.updatedAt = this.createdAt;
  }
}
