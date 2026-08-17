"use client";
import { useState } from "react";
import Image from "next/image";
import { AdminSidebar, AdminHeader } from "@/components/admin/AdminLayout";
import { Plus, Search, Pencil, Trash2, X, Check } from "lucide-react";

const INITIAL_PRODUCTS = [
  { id: "P001", name: "Apple iPhone 14 Pro Max", brand: "Apple", category: "Smartphone", price: 48999, stock: 12, status: "Active",   img: "https://cdn2.clevup.in/111129/1676810296715_SKU-0131_0.jpg?width=600&format=webp" },
  { id: "P002", name: "Samsung Galaxy S23 Ultra", brand: "Samsung", category: "Smartphone", price: 34999, stock: 8,  status: "Active",   img: "https://cdn2.clevup.in/111129/1662733475266_SKU-0117_0.jpg?width=600&format=webp" },
  { id: "P003", name: "OnePlus 11 5G",            brand: "OnePlus", category: "Smartphone", price: 24999, stock: 15, status: "Active",   img: "https://cdn2.clevup.in/111129/1662733715347_SKU-0113_0.jpg?width=600&format=webp" },
  { id: "P004", name: "Apple iPhone 13",           brand: "Apple",  category: "Smartphone", price: 32999, stock: 0,  status: "Inactive", img: "https://cdn2.clevup.in/111129/1663421580279_SKU-0119_0.jpg?width=600&format=webp" },
  { id: "P005", name: "Xiaomi 13 Pro",             brand: "Xiaomi", category: "Smartphone", price: 21999, stock: 5,  status: "Active",   img: "https://cdn2.clevup.in/111129/1662365143682_SKU-0106_0.jpg?width=600&format=webp" },
  { id: "P006", name: "OnePlus 9 Pro",             brand: "OnePlus",category: "Smartphone", price: 18999, stock: 3,  status: "Active",   img: "https://cdn2.clevup.in/111129/1662366813036_SKU-0110_0.jpg?width=600&format=webp" },
];

type Product = typeof INITIAL_PRODUCTS[number];

export default function AdminProducts() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", brand: "", category: "Smartphone", price: "", stock: "", status: "Active", img: "" });

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditProduct(null);
    setForm({ name: "", brand: "", category: "Smartphone", price: "", stock: "", status: "Active", img: "" });
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({ name: p.name, brand: p.brand, category: p.category, price: String(p.price), stock: String(p.stock), status: p.status, img: p.img });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editProduct) {
      setProducts(prev => prev.map(p => p.id === editProduct.id ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) } : p));
    } else {
      const newId = `P${String(products.length + 1).padStart(3, "0")}`;
      setProducts(prev => [...prev, { id: newId, ...form, price: Number(form.price), stock: Number(form.stock) }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9", fontFamily: "Inter, system-ui, sans-serif" }}>
      <AdminSidebar active="/admin/products" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <AdminHeader title="Products" />
        <main style={{ flex: 1, padding: 24 }}>

          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 16, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 400 }}>
              <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", width: 16, height: 16 }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…"
                style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px 10px 38px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, background: "#fff", outline: "none" }} />
            </div>
            <button onClick={openAdd} style={{ display: "flex", alignItems: "center", gap: 8, background: "#42c8b7", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", minHeight: 44 }}>
              <Plus size={18} /> Add Product
            </button>
          </div>

          {/* Table */}
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Product", "Brand", "Category", "Price", "Stock", "Status", "Actions"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id} style={{ borderTop: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafcff" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ position: "relative", width: 44, height: 44, background: "#f1f5f9", borderRadius: 8, flexShrink: 0, overflow: "hidden" }}>
                          <Image src={p.img} alt={p.name} fill style={{ objectFit: "contain", padding: 4 }} sizes="44px" />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: "#94a3b8" }}>{p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#0f172a" }}>{p.brand}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#64748b" }}>{p.category}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#0f172a" }}>₹{p.price.toLocaleString()}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: p.stock === 0 ? "#ef4444" : "#0f172a", fontWeight: p.stock === 0 ? 700 : 400 }}>{p.stock === 0 ? "Out of Stock" : p.stock}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 9999, background: p.status === "Active" ? "#dcfce7" : "#fee2e2", color: p.status === "Active" ? "#16a34a" : "#dc2626" }}>{p.status}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => openEdit(p)} style={{ background: "#eff6ff", border: "none", borderRadius: 6, padding: "6px 8px", cursor: "pointer", color: "#3b82f6" }}><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(p.id)} style={{ background: "#fef2f2", border: "none", borderRadius: 6, padding: "6px 8px", cursor: "pointer", color: "#ef4444" }}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: 48, color: "#94a3b8" }}>No products found.</div>
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: 480, maxWidth: "90vw", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{editProduct ? "Edit Product" : "Add Product"}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: 8, cursor: "pointer" }}><X size={18} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Product Name", key: "name" },
                { label: "Brand",        key: "brand" },
                { label: "Price (₹)",    key: "price" },
                { label: "Stock",        key: "stock" },
                { label: "Image URL",    key: "img" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input value={(form as any)[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none" }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6 }}>Status</label>
                <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value }))}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, background: "#fff" }}>
                  <option>Active</option><option>Inactive</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              <button onClick={() => setShowModal(false)} style={{ padding: "10px 20px", border: "1px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontSize: 14 }}>Cancel</button>
              <button onClick={handleSave} style={{ padding: "10px 24px", background: "#42c8b7", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                <Check size={16} /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
