const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  imageUrl: string | null;
  category: string;
  stock: number;
};

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/api/products`);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE}/api/products/${id}`);
  if (!res.ok) throw new Error("Failed to load product");
  return res.json();
}