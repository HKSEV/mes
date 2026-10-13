
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "QUALITY_INSPECTIONS" })
export class QualityInspection {
  @PrimaryGeneratedColumn({
    name: "ID",
    type: "int",
  })
  id!: number;

  @Column({
    name: "SERIAL_NUMBER",
    type: "varchar",
    length: 100,
    nullable: false,
    unique: true,
  })
  serialNumber!: string;

  @Column({
    name: "INSPECTION_TYPE",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  inspectionType?: string | null;

  @Column({
    name: "RESULT",
    type: "varchar",
    length: 20,
    nullable: false,
  })
  result!: string;

  @Column({
    name: "DEFECT_REASON",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  defectReason?: string | null;

  @Column({
    name: "INSPECTOR",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  inspector?: string | null;

  @CreateDateColumn({
    name: "INSPECTED_AT",
    type: "timestamp",
  })
  inspectedAt!: Date;
};
