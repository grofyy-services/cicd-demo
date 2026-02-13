import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <div className="container topbar-inner">
          <Link to="/" className="brand">
            Product Catalog
          </Link>
          <span className="muted">React + Express + Postgres</span>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container muted">
          © {new Date().getFullYear()} Product Catalog
        </div>
      </footer>
    </div>
  );
}