import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createProduct, type CreateProductPayload } from "../api";

const CURRENCIES = ["USD", "EUR", "GBP", "INR"];

export default function CreateProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<CreateProductPayload>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    currency: "USD",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? (value === "" ? 0 : parseFloat(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload: CreateProductPayload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        currency: form.currency,
      };
      if (form.imageUrl?.trim()) payload.imageUrl = form.imageUrl.trim();
      const product = await createProduct(payload);
      navigate(`/products/${product.id}`);
    } catch (e: any) {
      setError(e?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-product">
      <Link to="/" className="link">
        ← Back to list
      </Link>

      <h1 className="page-title">Add product</h1>
      <p className="muted">Submit a new product with name, description, price, image URL and currency.</p>

      <form className="form" onSubmit={handleSubmit}>
        {error && <div className="panel error">{error}</div>}

        <label className="field">
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product name"
            required
            maxLength={200}
          />
        </label>

        <label className="field">
          <span>Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product description"
            required
            rows={4}
          />
        </label>

        <label className="field">
          <span>Price</span>
          <input
            type="number"
            name="price"
            value={form.price === 0 ? "" : form.price}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </label>

        <label className="field">
          <span>Currency</span>
          <select name="currency" value={form.currency} onChange={handleChange}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Image URL (optional)</span>
          <input
            type="url"
            name="imageUrl"
            value={form.imageUrl ?? ""}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving…" : "Create product"}
          </button>
          <Link to="/" className="btn btn-ghost">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

