import {
  BeforeInsert,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class BasicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ nullable: true, type: 'timestamp' })
  updatedAt?: string;

  @BeforeInsert()
  changeUpdateDate() {
    this.updatedAt = this.createdAt;
  }
}
