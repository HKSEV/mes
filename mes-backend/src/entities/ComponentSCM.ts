
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "COMPONENT_SCM" })
export class ComponentSCM {
  @PrimaryGeneratedColumn({
    name: "ID",
    type: "int",
  })
  id!: number;

  @Column({
    name: "COMPONENT_NAME",
    type: "varchar",
    length: 100,
    nullable: false,
  })
  componentName!: string;

  @Column({
    name: "CATEGORY",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  category?: string | null;

  @Column({
    name: "STOCK_QUANTITY",
    type: "int",
    default: 0,
    nullable: true,
  })
  stockQuantity?: number | null;

  @Column({
    name: "MIN_THRESHOLD",
    type: "int",
    default: 100,
    nullable: true,
  })
  minThreshold?: number | null;

  @Column({
    name: "SUPPLIER",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  supplier?: string | null;

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
