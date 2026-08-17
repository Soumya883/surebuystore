"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string;
  title: string;
  price: number;
  mrp: number;
  images: string[];
  condition: string;
  quantity: number;
}

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  const save = (updated: CartItem[]) => {
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const updateQty = (id: string, delta: number) => {
    const updated = items.map(i =>
      i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
    );
    save(updated);
  };

  const remove = (id: string) => save(items.filter(i => i.id !== id));

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const savings = items.reduce((sum, i) => sum + (i.mrp - i.price) * i.quantity, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "16px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ position: "relative", width: 140, height: 40 }}>
            <Image src="https://cdn2.clevup.in/111129/1644850958193_114304_logo.jpg?height=200&format=webp" alt="SureBuy" fill style={{ objectFit: "contain", objectPosition: "left" }} />
          </div>
        </Link>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#333" }}>My Cart</span>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
        {/* Left: Cart Items */}
        <div>
          {items.length === 0 ? (
            <div style={{ background: "#fff", borderRadius: 12, padding: "60px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#333", marginBottom: 8 }}>Your cart is empty</h2>
              <p style={{ color: "#888", marginBottom: 24 }}>Add some great deals to your cart!</p>
              <Link href="/products" style={{ background: "#42c8b7", color: "#fff", padding: "12px 28px", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: 15 }}>
                Browse Products
              </Link>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ fontWeight: 700, color: "#333" }}>
                  {items.length} Item{items.length !== 1 ? "s" : ""} in Cart
                </span>
              </div>
              {items.map((item, idx) => (
                <div key={item.id} style={{
                  display: "flex", gap: 16, padding: "20px", alignItems: "center",
                  borderBottom: idx < items.length - 1 ? "1px solid #f0f0f0" : "none"
                }}>
                  <div style={{ position: "relative", width: 80, height: 80, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                    <Image src={item.images?.[0] || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200"} alt={item.title} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#333", marginBottom: 4 }}>{item.title}</h3>
                    <span style={{ fontSize: 12, background: "#e8f5e9", color: "#2e7d32", padding: "2px 8px", borderRadius: 4 }}>{item.condition}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                      <span style={{ fontSize: 17, fontWeight: 700, color: "#333" }}>₹{item.price.toLocaleString()}</span>
                      <span style={{ fontSize: 13, color: "#aaa", textDecoration: "line-through" }}>₹{item.mrp.toLocaleString()}</span>
                    </div>
                  </div>
                  {/* Qty Controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button onClick={() => updateQty(item.id, -1)} style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid #ddd", background: "#fff", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid #ddd", background: "#fff", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    <button onClick={() => remove(item.id)} style={{ marginLeft: 8, background: "none", border: "none", color: "#e53e3e", cursor: "pointer", fontSize: 13, padding: "4px 8px" }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        {items.length > 0 && (
          <div style={{ position: "sticky", top: 80 }}>
            {/* Savings banner */}
            <div style={{ background: "linear-gradient(135deg, #42c8b7, #2ea898)", borderRadius: 12, padding: "12px 16px", marginBottom: 12, color: "#fff", textAlign: "center" }}>
              <span style={{ fontWeight: 700 }}>🎉 You save ₹{savings.toLocaleString()} on this order!</span>
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: "20px", marginBottom: 12 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>Price Details</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Row label={`Price (${items.length} items)`} value={`₹${items.reduce((s, i) => s + i.mrp * i.quantity, 0).toLocaleString()}`} />
                <Row label="Discount" value={`-₹${savings.toLocaleString()}`} green />
                <Row label="Delivery" value="FREE" green />
                <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16 }}>
                  <span>Total Amount</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const token = localStorage.getItem("access_token");
                if (!token) {
                  router.push("/auth?redirect=/checkout");
                } else {
                  router.push("/checkout");
                }
              }}
              style={{ width: "100%", padding: "16px 0", background: "linear-gradient(135deg, #ff6b35, #ee5a24)", border: "none", borderRadius: 12, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", letterSpacing: "0.02em" }}
            >
              PLACE ORDER →
            </button>

            {/* COD Badge */}
            <div style={{ background: "#fff8e1", border: "1px solid #ffc107", borderRadius: 10, padding: "12px 14px", marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>💰</span>
              <div>
                <div style={{ fontWeight: 700, color: "#333", fontSize: 13 }}>Cash on Delivery Available</div>
                <div style={{ fontSize: 12, color: "#666" }}>Pay ₹0 now — Pay only when delivered</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, green }: { label: string; value: string; green?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: green ? "#2e7d32" : "#555" }}>
      <span>{label}</span>
      <span style={{ fontWeight: green ? 600 : 400 }}>{value}</span>
    </div>
  );
}
