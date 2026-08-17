"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Filter, Star, ShoppingCart, Heart, SlidersHorizontal, X } from "lucide-react";

const PRODUCTS = [
  { id: "P1", name: "Apple iPhone 14 Pro Max", price: 48999, mrp: 109900, discount: "55%", rating: 4.9, reviews: 312, img: "https://cdn2.clevup.in/111129/1676810296715_SKU-0131_0.jpg?width=600&format=webp", condition: "Like New", brand: "Apple", storage: "256GB", date: "2026-08-16" },
  { id: "P2", name: "Samsung Galaxy S22 Ultra", price: 34999, mrp: 79999, discount: "56%", rating: 4.8, reviews: 218, img: "https://cdn2.clevup.in/111129/1663240526734_SKU-0118_0.jpg?width=600&format=webp", condition: "Good", brand: "Samsung", storage: "256GB", date: "2026-08-15" },
  { id: "P3", name: "OnePlus 11 5G", price: 24999, mrp: 56999, discount: "56%", rating: 4.7, reviews: 189, img: "https://cdn2.clevup.in/111129/1662733715347_SKU-0113_0.jpg?width=600&format=webp", condition: "Like New", brand: "OnePlus", storage: "128GB", date: "2026-08-14" },
  { id: "P4", name: "Apple iPhone 13", price: 32999, mrp: 79900, discount: "59%", rating: 4.8, reviews: 541, img: "https://cdn2.clevup.in/111129/1663421580279_SKU-0119_0.jpg?width=600&format=webp", condition: "Good", brand: "Apple", storage: "128GB", date: "2026-08-10" },
  { id: "P5", name: "Xiaomi 12 Pro", price: 21999, mrp: 62999, discount: "65%", rating: 4.6, reviews: 120, img: "https://cdn2.clevup.in/111129/1662365143682_SKU-0106_0.jpg?width=600&format=webp", condition: "Fair", brand: "Xiaomi", storage: "256GB", date: "2026-08-05" },
  { id: "P6", name: "OnePlus 9 Pro", price: 18999, mrp: 64999, discount: "70%", rating: 4.7, reviews: 340, img: "https://cdn2.clevup.in/111129/1662366813036_SKU-0110_0.jpg?width=600&format=webp", condition: "Good", brand: "OnePlus", storage: "128GB", date: "2026-08-01" },
  { id: "P7", name: "Samsung Galaxy S21", price: 16999, mrp: 54999, discount: "69%", rating: 4.5, reviews: 290, img: "https://cdn2.clevup.in/111129/1662544083730_SKU-0116_0.jpg?width=600&format=webp", condition: "Fair", brand: "Samsung", storage: "128GB", date: "2026-07-28" },
  { id: "P8", name: "Apple iPhone 12", price: 22999, mrp: 69900, discount: "67%", rating: 4.8, reviews: 680, img: "https://cdn2.clevup.in/111129/1663240526734_SKU-0118_0.jpg?width=600&format=webp", condition: "Good", brand: "Apple", storage: "64GB", date: "2026-07-25" },
];

const CONDITION_COLORS: Record<string, { bg: string; color: string }> = {
  "Like New": { bg: "#d1fae5", color: "#065f46" },
  "Good":     { bg: "#dbeafe", color: "#1e40af" },
  "Fair":     { bg: "#fef3c7", color: "#92400e" },
};

export default function ProductsPage() {
  const [brands, setBrands] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortType, setSortType] = useState("Popularity");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(p => {
      if (brands.length > 0 && !brands.includes(p.brand)) return false;
      if (conditions.length > 0 && !conditions.includes(p.condition)) return false;
      if (minPrice && p.price < Number(minPrice)) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      return true;
    });
    if (sortType === "Price: Low to High") result.sort((a, b) => a.price - b.price);
    else if (sortType === "Price: High to Low") result.sort((a, b) => b.price - a.price);
    else if (sortType === "Newest") result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    else result.sort((a, b) => b.reviews - a.reviews);
    return result;
  }, [brands, conditions, minPrice, maxPrice, sortType]);

  const toggleFilter = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  const addToCart = (p: typeof PRODUCTS[0]) => {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx = existing.findIndex((i: any) => i.id === p.id);
    if (idx >= 0) existing[idx].quantity += 1;
    else existing.push({ id: p.id, title: p.name, price: p.price, mrp: p.mrp, images: [p.img], condition: p.condition, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(existing));
    window.dispatchEvent(new Event("storage"));
    // mini toast
    const toast = document.getElementById("cart-toast");
    if (toast) { toast.style.opacity = "1"; setTimeout(() => { toast.style.opacity = "0"; }, 2000); }
  };

  const toggleWishlist = (id: string) =>
    setWishlist(w => w.includes(id) ? w.filter(i => i !== id) : [...w, id]);

  const Sidebar = () => (
    <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 16, padding: 24, position: "sticky", top: 80 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Filters</h3>
        {(brands.length + conditions.length) > 0 && (
          <button onClick={() => { setBrands([]); setConditions([]); setMinPrice(""); setMaxPrice(""); }}
            style={{ fontSize: 12, color: "#42c8b7", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>
            Clear All
          </button>
        )}
      </div>
      {/* Brands */}
      <div style={{ marginBottom: 24 }}>
        <h4 style={{ fontSize: 13, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Brand</h4>
        {["Apple", "Samsung", "OnePlus", "Xiaomi", "Vivo", "Oppo"].map(b => (
          <label key={b} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, cursor: "pointer" }}>
            <div onClick={() => toggleFilter(brands, setBrands, b)}
              style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${brands.includes(b) ? "#42c8b7" : "#ddd"}`, background: brands.includes(b) ? "#42c8b7" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", transition: "all 150ms" }}>
              {brands.includes(b) && <span style={{ color: "#fff", fontSize: 11 }}>✓</span>}
            </div>
            <span style={{ fontSize: 14, color: "#333" }}>{b}</span>
          </label>
        ))}
      </div>
      {/* Condition */}
      <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 20, marginBottom: 24 }}>
        <h4 style={{ fontSize: 13, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Condition</h4>
        {["Like New", "Good", "Fair"].map(c => (
          <label key={c} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, cursor: "pointer" }}>
            <div onClick={() => toggleFilter(conditions, setConditions, c)}
              style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${conditions.includes(c) ? "#42c8b7" : "#ddd"}`, background: conditions.includes(c) ? "#42c8b7" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", transition: "all 150ms" }}>
              {conditions.includes(c) && <span style={{ color: "#fff", fontSize: 11 }}>✓</span>}
            </div>
            <span style={{ fontSize: 14, color: "#333" }}>{c}</span>
          </label>
        ))}
      </div>
      {/* Price */}
      <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 20 }}>
        <h4 style={{ fontSize: 13, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Price Range</h4>
        <div style={{ display: "flex", gap: 8 }}>
          <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min ₹"
            style={{ width: "50%", padding: "9px 10px", border: "1px solid #e0e0e0", borderRadius: 8, fontSize: 13, outline: "none" }} />
          <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max ₹"
            style={{ width: "50%", padding: "9px 10px", border: "1px solid #e0e0e0", borderRadius: 8, fontSize: 13, outline: "none" }} />
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#f7f8f9", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {/* Toast notification */}
      <div id="cart-toast" style={{ position: "fixed", bottom: 24, right: 24, background: "#0f0f0f", color: "#fff", padding: "12px 20px", borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 9999, opacity: 0, transition: "opacity 300ms", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", gap: 10 }}>
        <ShoppingCart size={16} style={{ color: "#42c8b7" }} /> Added to cart!
      </div>

      {/* Breadcrumb */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8e8e8", padding: "14px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", fontSize: 13, color: "#888", display: "flex", alignItems: "center", gap: 6 }}>
          <Link href="/" style={{ textDecoration: "none", color: "#888" }}>Home</Link>
          <ChevronRight size={14} />
          <span style={{ color: "#0f0f0f", fontWeight: 600 }}>Refurbished Phones</span>
        </div>
      </div>

      {/* Mobile filter bar */}
      <div className="md:hidden flex gap-[10px] overflow-x-auto p-[12px_16px] bg-[#fff] border-b border-[#eee]">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: sidebarOpen ? "#42c8b7" : "#f5f5f5", color: sidebarOpen ? "#fff" : "#333", border: "1px solid #e0e0e0", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
          <SlidersHorizontal size={14} /> Filters {(brands.length + conditions.length) > 0 && `(${brands.length + conditions.length})`}
        </button>
        <select value={sortType} onChange={e => setSortType(e.target.value)}
          style={{ padding: "8px 16px", border: "1px solid #e0e0e0", borderRadius: 20, fontSize: 13, background: "#f5f5f5", outline: "none", fontWeight: 500 }}>
          <option value="Popularity">Popularity</option>
          <option value="Price: Low to High">Price: Low → High</option>
          <option value="Price: High to Low">Price: High → Low</option>
          <option value="Newest">Newest</option>
        </select>
        {brands.map(b => (
          <button key={b} onClick={() => toggleFilter(brands, setBrands, b)}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#e8f9f7", color: "#42c8b7", border: "1px solid #42c8b7", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
            {b} <X size={12} />
          </button>
        ))}
      </div>

      <div className="max-w-[1280px] mx-auto p-[24px_16px] flex flex-col md:flex-row gap-[24px] items-start w-full">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-[260px] shrink-0 products-sidebar">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex" }}>
            <div style={{ flex: 1, background: "rgba(0,0,0,0.4)" }} onClick={() => setSidebarOpen(false)} />
            <div style={{ width: 300, background: "#fff", padding: 20, overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ margin: 0, fontWeight: 700 }}>Filters</h3>
                <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <X size={20} />
                </button>
              </div>
              <Sidebar />
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f0f0f", margin: 0 }}>
              Refurbished Phones
              <span style={{ fontSize: 14, fontWeight: 500, color: "#888", marginLeft: 8 }}>({filteredProducts.length} products)</span>
            </h1>
          </div>

          {filteredProducts.length === 0 ? (
            <div style={{ background: "#fff", borderRadius: 16, padding: "60px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
              <h3 style={{ color: "#333", marginBottom: 8 }}>No products found</h3>
              <p style={{ color: "#888" }}>Try adjusting your filters</p>
              <button onClick={() => { setBrands([]); setConditions([]); setMinPrice(""); setMaxPrice(""); }}
                style={{ marginTop: 16, padding: "10px 24px", background: "#42c8b7", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-[20px]">
              {filteredProducts.map(p => {
                const condStyle = CONDITION_COLORS[p.condition] || { bg: "#f3f4f6", color: "#6b7280" };
                const isWishlisted = wishlist.includes(p.id);
                return (
                  <div key={p.id} style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8e8e8", overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform 200ms, box-shadow 200ms", cursor: "pointer" }}
                    onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.1)"; }}
                    onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                  >
                    {/* Image */}
                    <div style={{ position: "relative", height: 200, background: "#f9fafb" }}>
                      <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: "#ff4444", color: "#fff", fontSize: 11, fontWeight: 800, padding: "3px 8px", borderRadius: 6 }}>
                        {p.discount} OFF
                      </div>
                      <button onClick={e => { e.stopPropagation(); toggleWishlist(p.id); }}
                        style={{ position: "absolute", top: 10, right: 10, zIndex: 2, background: "#fff", border: "1px solid #eee", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                        <Heart size={14} style={{ color: isWishlisted ? "#e53e3e" : "#aaa", fill: isWishlisted ? "#e53e3e" : "none" }} />
                      </button>
                      <Image src={p.img} alt={p.name} fill style={{ objectFit: "contain", padding: 20 }} sizes="260px" />
                    </div>

                    {/* Info */}
                    <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#42c8b7", textTransform: "uppercase", letterSpacing: "0.05em" }}>{p.brand} · {p.storage}</div>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: 0, lineHeight: 1.4 }}>{p.name}</h3>

                      {/* Stars */}
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ display: "flex", gap: 2 }}>
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} size={11} style={{ color: i <= Math.floor(p.rating) ? "#f59e0b" : "#ddd", fill: i <= Math.floor(p.rating) ? "#f59e0b" : "none" }} />
                          ))}
                        </div>
                        <span style={{ fontSize: 12, color: "#888" }}>{p.rating} ({p.reviews})</span>
                      </div>

                      {/* Condition badge */}
                      <div style={{ display: "inline-block", alignSelf: "flex-start" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: condStyle.bg, color: condStyle.color }}>{p.condition}</span>
                      </div>

                      {/* Price */}
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: "auto" }}>
                        <span style={{ fontSize: 20, fontWeight: 800, color: "#0f0f0f" }}>₹{p.price.toLocaleString()}</span>
                        <span style={{ fontSize: 12, color: "#aaa", textDecoration: "line-through" }}>₹{p.mrp.toLocaleString()}</span>
                      </div>

                      {/* COD label */}
                      <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>✓ Cash on Delivery Available</div>

                      {/* Actions */}
                      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                        <button onClick={() => addToCart(p)}
                          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 0", background: "#f0fdfa", border: "1.5px solid #42c8b7", borderRadius: 10, color: "#42c8b7", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 150ms" }}
                          onMouseOver={e => { e.currentTarget.style.background = "#42c8b7"; e.currentTarget.style.color = "#fff"; }}
                          onMouseOut={e => { e.currentTarget.style.background = "#f0fdfa"; e.currentTarget.style.color = "#42c8b7"; }}>
                          <ShoppingCart size={14} /> Add to Cart
                        </button>
                        <Link href="/cart" onClick={() => addToCart(p)}
                          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 0", background: "#42c8b7", borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none", transition: "background 150ms" }}
                          onMouseOver={(e: any) => e.currentTarget.style.background = "#2ea898"}
                          onMouseOut={(e: any) => e.currentTarget.style.background = "#42c8b7"}>
                          Buy Now
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
