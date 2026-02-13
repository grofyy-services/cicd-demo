import { Link } from "react-router-dom";
import type { Product } from "../api";

function formatMoney(value: string, currency: string) {
  const num = Number(value);
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency
  }).format(num);
}

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link to={`/products/${p.id}`} className="card">
      <div className="card-image">
        {p.imageUrl ? (
          <img src={p.imageUrl} alt={p.title} loading="lazy" />
        ) : (
          <div className="placeholder">No Image</div>
        )}
      </div>

      <div className="card-body">
        <div className="card-top">
          <h3 className="card-title">{p.title}</h3>
          <span className="badge">{p.category}</span>
        </div>

        <p className="card-desc">{p.description}</p>

        <div className="card-bottom">
          <strong>{formatMoney(p.price, p.currency)}</strong>
          <span className={p.stock > 0 ? "stock ok" : "stock out"}>
            {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
          </span>
        </div>
      </div>
    </Link>
  );
}