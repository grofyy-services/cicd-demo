import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./entity/Product";

const isProd = process.env.NODE_ENV === "production";

// ✅ Use DATABASE_URL when provided, else use individual DB_* fields
export const AppDataSource = new DataSource({
  type: "postgres",
  url: 'postgresql://postgres:12345678@client-rds-postgres-prod.cd02yeymmv4n.us-east-2.rds.amazonaws.com:5432/productcatelog', // ✅ full postgres url goes here
  host: process.env.DB_HOST || "localhost", // used only if url not set
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || "app",
  password: process.env.DB_PASSWORD || "app",
  database: process.env.DB_NAME || "product_catalog",
  entities: [Product],
  migrations: [isProd ? "dist/migrations/*.js" : "src/migrations/*.ts"],
  synchronize: false,
  logging: false,
  ssl:  { rejectUnauthorized: false } 
});
