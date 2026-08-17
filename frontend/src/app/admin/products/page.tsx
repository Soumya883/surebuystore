"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { AdminSidebar, AdminHeader } from "@/components/admin/AdminLayout";
import { Plus, Search, Pencil, Trash2, X, Check, Upload, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  title: string;
  name?: string;
  brand?: { name: string } | string;
  category?: { name: string } | string;
  price: number;
  mrp?: number;
  stock?: number;
  status?: string;
  images?: string[];
  img?: string;
  condition?: string;
}

export default function AdminProducts() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const [form, setForm] = useState({
    title: "",
    brand: "Apple",
    category: "Smartphone",
    price: "",
    mrp: "",
    stock: "10",
    condition: "Excellent",
    img: "",
  });

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, img: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const openAdd = () => {
    setEditProduct(null);
    setForm({ title: "", brand: "Apple", category: "Smartphone", price: "", mrp: "", stock: "10", condition: "Excellent", img: "" });
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({
      title: p.title || p.name || "",
      brand: typeof p.brand === "object" ? p.brand?.name || "Apple" : p.brand || "Apple",
      category: typeof p.category === "object" ? p.category?.name || "Smartphone" : p.category || "Smartphone",
      price: String(p.price || 0),
      mrp: String(p.mrp || p.price || 0),
      stock: String(p.stock ?? 10),
      condition: p.condition || "Excellent",
      img: p.images?.[0] || p.img || "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Session expired. Please log in as Admin.");
      router.push("/auth");
      return;
    }

    const payload = {
      title: form.title,
      slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      price: Number(form.price),
      mrp: Number(form.mrp) || Number(form.price),
      stock: Number(form.stock),
      condition: form.condition,
      images: form.img ? [form.img] : ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"],
    };

    try {
      let res;
      if (editProduct) {
        res = await fetch(`${API_BASE}/products/${editProduct.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE}/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save product");
      }

      setShowModal(false);
      fetchProducts();
    } catch (err: any) {
      alert(`Error saving product: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    }
  };

  const filtered = products.filter(p =>
    (p.title || p.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9", fontFamily: "Inter, system-ui, sans-serif" }}>
      <AdminSidebar active="/admin/products" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <AdminHeader title="Products Management (Live CRUD)" />
        <main style={{ flex: 1, padding: 24 }}>

          {/* Top Bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 16, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 400 }}>
              <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", width: 16, height: 16 }} />
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Search products in database…"
                style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px 10px 38px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, background: "#fff", outline: "none" }} 
              />
            </div>
            
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={fetchProducts} style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", color: "#475569", border: "1px solid #cbd5e1", borderRadius: 8, padding: "10px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                <RefreshCw size={16} /> Refresh
              </button>
              
              <button onClick={openAdd} style={{ display: "flex", alignItems: "center", gap: 8, background: "#42c8b7", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                <Plus size={18} /> Add New Item
              </button>
            </div>
          </div>

          {error && <div style={{ background: "#fee2e2", border: "1px solid #f87171", borderRadius: 8, padding: "12px 16px", color: "#dc2626", marginBottom: 16 }}>{error}</div>}

          {/* Table */}
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Item / Photo", "Price", "MRP", "Stock", "Condition", "Actions"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} style={{ textAlign: "center", padding: 48, color: "#64748b" }}>Loading database products...</td></tr>
                ) : filtered.map((p, i) => {
                  const imgUrl = p.images?.[0] || p.img || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200";
                  return (
                    <tr key={p.id} style={{ borderTop: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafcff" }}>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ position: "relative", width: 48, height: 48, background: "#f8fafc", borderRadius: 8, flexShrink: 0, overflow: "hidden", border: "1px solid #e2e8f0" }}>
                            <Image src={imgUrl} alt={p.title || "Product"} fill style={{ objectFit: "contain", padding: 4 }} sizes="48px" />
                          </div>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{p.title || p.name}</div>
                            <div style={{ fontSize: 11, color: "#94a3b8" }}>ID: {p.id.slice(0, 8)}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 14, fontWeight: 800, color: "#0f172a" }}>₹{Number(p.price).toLocaleString()}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#94a3b8", textDecoration: "line-through" }}>₹{Number(p.mrp || p.price).toLocaleString()}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: (p.stock ?? 10) === 0 ? "#ef4444" : "#0f172a", fontWeight: (p.stock ?? 10) === 0 ? 700 : 500 }}>
                        {(p.stock ?? 10) === 0 ? "Out of Stock" : `${p.stock ?? 10} in stock`}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: "#e8f9f7", color: "#2ea898" }}>
                          {p.condition || "Excellent"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => openEdit(p)} style={{ background: "#eff6ff", border: "none", borderRadius: 6, padding: "8px 10px", cursor: "pointer", color: "#3b82f6" }}><Pencil size={15} /></button>
                          <button onClick={() => handleDelete(p.id)} style={{ background: "#fef2f2", border: "none", borderRadius: 6, padding: "8px 10px", cursor: "pointer", color: "#ef4444" }}><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {!loading && filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: 48, color: "#94a3b8" }}>No products found in database. Click &apos;Add New Item&apos; above to create one.</div>
            )}
          </div>
        </main>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: 500, maxWidth: "90vw", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{editProduct ? "Edit Product" : "Add New Item"}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: 8, cursor: "pointer" }}><X size={18} /></button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxHeight: "65vh", overflowY: "auto", paddingRight: 4 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6 }}>Title / Model Name *</label>
                <input value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} placeholder="e.g. iPhone 15 Pro Max 256GB"
                  style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, outline: "none" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6 }}>Selling Price (₹) *</label>
                  <input type="number" value={form.price} onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))} placeholder="e.g. 48999"
                    style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6 }}>MRP / Retail Price (₹)</label>
                  <input type="number" value={form.mrp} onChange={e => setForm(prev => ({ ...prev, mrp: e.target.value }))} placeholder="e.g. 109900"
                    style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, outline: "none" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6 }}>Stock Quantity</label>
                  <input type="number" value={form.stock} onChange={e => setForm(prev => ({ ...prev, stock: e.target.value }))} placeholder="10"
                    style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6 }}>Condition</label>
                  <select value={form.condition} onChange={e => setForm(prev => ({ ...prev, condition: e.target.value }))}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, background: "#fff" }}>
                    <option>Flawless</option><option>Excellent</option><option>Good</option><option>Fair</option>
                  </select>
                </div>
              </div>

              {/* Local File Image Upload OR URL */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6 }}>Product Image (Upload Local File or Paste URL)</label>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <label style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    <Upload size={16} /> Choose File
                    <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />
                  </label>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>or URL below</span>
                </div>
                <input 
                  value={form.img} 
                  onChange={e => setForm(prev => ({ ...prev, img: e.target.value }))} 
                  placeholder="Paste Image URL or choose file above"
                  style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 13, marginTop: 8, outline: "none" }} 
                />
                {form.img && (
                  <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10, background: "#f8fafc", padding: 8, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                    <div style={{ position: "relative", width: 44, height: 44, borderRadius: 6, overflow: "hidden" }}>
                      <Image src={form.img} alt="Preview" fill style={{ objectFit: "contain" }} sizes="44px" />
                    </div>
                    <span style={{ fontSize: 12, color: "#16a3a0", fontWeight: 600 }}>✓ Image Preview Loaded</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
              <button onClick={() => setShowModal(false)} style={{ padding: "10px 20px", border: "1px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontSize: 14 }}>Cancel</button>
              <button onClick={handleSave} style={{ padding: "10px 24px", background: "#42c8b7", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                <Check size={16} /> Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
