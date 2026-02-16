import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct, buyProduct, type Product } from "../api";

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
  const [buying, setBuying] = useState(false);
  const [buyErr, setBuyErr] = useState<string | null>(null);

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

  async function handleBuy() {
    if (!id || !item || item.stock < 1) return;
    try {
      setBuying(true);
      setBuyErr(null);
      const updated = await buyProduct(id);
      setItem(updated);
    } catch (e: any) {
      setBuyErr(e?.message || "Purchase failed");
    } finally {
      setBuying(false);
    }
  }

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

          <div className="details-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleBuy}
              disabled={item.stock < 1 || buying}
            >
              {buying ? "Buying…" : "Buy"}
            </button>
            {buyErr && <span className="error-text">{buyErr}</span>}
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