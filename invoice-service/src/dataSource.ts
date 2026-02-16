import "./loadEnv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Invoice } from "./entity/Invoice";
import path from "path";

const root = path.resolve(__dirname, "..");
const migrationsDir =
  process.env.NODE_ENV === "production"
    ? path.join(root, "dist", "migrations", "*.js")
    : path.join(root, "src", "migrations", "*.ts");

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [Invoice],
  migrations: [migrationsDir],
  synchronize: false,
  logging: false,
});
