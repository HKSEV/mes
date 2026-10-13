
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "MEMBERS" })
export class Member {
  @PrimaryGeneratedColumn({
    type: "number",
    name: "ID",
    // Oracle 12c 이상에서는 IDENTITY 컬럼 사용 가능
    // Oracle 11g 이하에서는 별도의 Sequence 설정 필요
  })
  id!: number;

  @Column({
    type: "varchar2",
    length: 50,
    nullable: false,
    name: "FIRST_NAME",
  })
  firstName!: string;

  @Column({
    type: "varchar2",
    length: 50,
    nullable: false,
    name: "LAST_NAME",
  })
  lastName!: string;

  @Column({
    type: "varchar2",
    length: 100,
    nullable: false,
    unique: true,
    name: "EMAIL",
  })
  email!: string;

  @Column({
    type: "varchar2",
    length: 255,
    nullable: false,
    name: "PASSWORD",
  })
  password!: string;

  @Column({
    type: "varchar2",
    length: 100,
    nullable: true,
    name: "COMPANY_NAME",
  })
  companyName?: string | null;

  @Column({
    type: "varchar2",
    length: 50,
    nullable: true,
    name: "POSITION",
  })
  position?: string | null;

  @Column({
    type: "varchar2",
    length: 20,
    nullable: true,
    name: "TEL",
  })
  tel?: string | null;

  @Column({
    type: "varchar2",
    length: 255,
    nullable: true,
    name: "ADDRESS",
  })
  address?: string | null;

  @Column({
    type: "varchar2",
    length: 255,
    nullable: true,
    name: "DETAIL_ADDRESS",
  })
  detailAddress?: string | null;

  @Column({
    type: "varchar2",
    length: 20,
    nullable: true,
    name: "GENDER",
  })
  gender?: string | null;

  @CreateDateColumn({
    type: "timestamp",
    name: "CREATED_AT",
    update: false,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    name: "UPDATED_AT",
  })
  updatedAt!: Date;
}
