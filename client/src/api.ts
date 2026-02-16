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

export async function buyProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE}/api/products/${id}/buy`, { method: "POST" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Failed to buy product");
  return data.product;
}

export type CreateProductPayload = {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  currency: string;
};

export async function createProduct(payload: CreateProductPayload): Promise<Product> {
  const res = await fetch(`${BASE}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to create product");
  }
  return res.json();
}