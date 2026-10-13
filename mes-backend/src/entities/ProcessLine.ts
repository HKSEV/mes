
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "PROCESS_LINES" })
export class ProcessLine {
  @PrimaryGeneratedColumn({
    name: "ID",
    type: "int",
  })
  id!: number;

  @Column({
    name: "LINE_NAME",
    type: "varchar",
    length: 100,
    nullable: false,
  })
  lineName!: string;

  @Column({
    name: "PROCESS_TYPE",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  processType?: string | null;

  @Column({
    name: "STATUS",
    type: "varchar",
    length: 30,
    default: "RUNNING",
    nullable: true,
  })
  status?: string | null;

  @Column({
    name: "CURRENT_PRODUCT",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  currentProduct?: string | null;

  @Column({
    name: "OPERATOR",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  operator?: string | null;

  @CreateDateColumn({
    name: "CREATED_AT",
    type: "timestamp",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "UPDATED_AT",
    type: "timestamp",
  })
  updatedAt!: Date;
};
