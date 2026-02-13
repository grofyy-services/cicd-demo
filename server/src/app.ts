import express from "express";
import cors from "cors";
import { productRouter } from "./routes/product.routes";

export function createApp() {
  const app = express();
  app.use(
    cors({
      origin: ["*"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(express.json());

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "*"
    })
  );

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.use("/api/products", productRouter);

  // simple error handler
  app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  });

  return app;
}