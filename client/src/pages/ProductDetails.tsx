import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct, type Product } from "../api";

function formatMoney(value: string, currency: string) {
  const num = Number(value);
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency
  }).format(num);
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        setLoading(true);
        setErr(null);
        const data = await getProduct(id);
        setItem(data);
      } catch (e: any) {
        setErr(e?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="panel">Loading…</div>;
  if (err) return <div className="panel error">Error: {err}</div>;
  if (!item) return <div className="panel">Not found</div>;

  return (
    <div className="details">
      <Link to="/" className="link">
        ← Back
      </Link>

      <div className="details-card">
        <div className="details-image">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.title} />
          ) : (
            <div className="placeholder">No Image</div>
          )}
        </div>

        <div className="details-body">
          <div className="details-top">
            <h1 className="details-title">{item.title}</h1>
            <span className="badge">{item.category}</span>
          </div>

          <div className="details-price">
            {formatMoney(item.price, item.currency)}
          </div>

          <p className="details-desc">{item.description}</p>

          <div className="details-meta">
            <div>
              <div className="muted">Stock</div>
              <div>{item.stock}</div>
            </div>
            <div>
              <div className="muted">Currency</div>
              <div>{item.currency}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}