import "./loadEnv";
import { AppDataSource } from "./dataSource";
import { startConsumer } from "./consumer";

async function bootstrap() {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();

  await startConsumer();
}

bootstrap().catch((e) => {
  console.error("Fatal startup error:", e);
  process.exit(1);
});
