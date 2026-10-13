
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "PRODUCTION_RECORDS" })
export class ProductionRecord {
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
    name: "TARGET_COUNT",
    type: "int",
    default: 0,
    nullable: true,
  })
  targetCount?: number | null;

  @Column({
    name: "ACTUAL_COUNT",
    type: "int",
    default: 0,
    nullable: true,
  })
  actualCount?: number | null;

  @Column({
    name: "DEFECT_COUNT",
    type: "int",
    default: 0,
    nullable: true,
  })
  defectCount?: number | null;

  @Column({
    name: "YIELD_RATE",
    type: "float",
    default: 100.0,
    nullable: true,
  })
  yieldRate?: number | null;

  @CreateDateColumn({
    name: "RECORDED_AT",
    type: "timestamp",
  })
  recordedAt!: Date;

  @UpdateDateColumn({
    name: "UPDATED_AT",
    type: "timestamp",
  })
  updatedAt!: Date;
}
