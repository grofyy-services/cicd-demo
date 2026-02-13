import { useEffect, useState } from "react";
import { getProducts, type Product } from "../api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const data = await getProducts();
        setItems(data);
      } catch (e: any) {
        setErr(e?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="panel">Loading products…</div>;
  if (err) return <div className="panel error">Error: {err}</div>;

  return (
    <div>
      <h1 className="page-title">Products</h1>
      <p className="muted">Click a product to view details.</p>

      <div className="grid">
        {items.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}