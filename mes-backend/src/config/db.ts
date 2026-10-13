import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path = require("path");

dotenv.config({path: path.join(__dirname, "../../.env")});

export const AppDataSource = new DataSource({
  type: "oracle",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 1521,
  username: process.env.DB_USER as string || "MES_USR",
  password: process.env.DB_PASSWORD as string || "1234",
  serviceName: process.env.DB_SERVICE_NAME || "XE",
  synchronize: false,
  logging: true,
  entities: [__dirname + "/../entities/*.ts"],
  extra: {
    poolMin: 2,
    poolMax: 10,
    poolIncrement: 1
  }
})