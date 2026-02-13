import { Router } from "express";
import { AppDataSource } from "../dataSource";
import { Product } from "../entity/Product";

export const productRouter = Router();

const repo = AppDataSource.getRepository(Product);

/**
 * GET /api/products
 * returns list of products
 */
productRouter.get("/", async (_req, res) => {
  const products = await repo.find({
    order: { createdAt: "DESC" },
  });
  res.json(products);
});

/**
 * GET /api/products/:id
 * returns product details
 */
productRouter.get("/:id", async (req, res) => {
  const product = await repo.findOne({ where: { id: req.params.id } });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});