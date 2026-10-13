
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "EQUIPMENTS" })
export class Equipment {
  @PrimaryGeneratedColumn({
    name: "ID",
    type: "int",
  })
  id!: number;

  @Column({
    name: "EQUIPMENT_NAME",
    type: "varchar",
    length: 100,
    nullable: false,
  })
  equipmentName!: string;

  @Column({
    name: "CLEANROOM_ZONE",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  cleanroomZone?: string | null;

  @Column({
    name: "TEMPERATURE",
    type: "float",
    nullable: true,
  })
  temperature?: number | null;

  @Column({
    name: "HUMIDITY",
    type: "float",
    nullable: true,
  })
  humidity?: number | null;

  @Column({
    name: "STATUS",
    type: "varchar",
    length: 30,
    default: "NORMAL",
    nullable: true,
  })
  status?: string | null;

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
