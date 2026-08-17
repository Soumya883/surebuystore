import Link from "next/link";
export default function DealsPage() {
  const deals = [
    { name: "iPhone 14 Pro Max 256GB", price: "₹47,999", mrp: "₹1,09,900", off: "56% OFF", badge: "🔥 MEGA DEAL", ends: "Ends in 2h 34m", emoji: "📱" },
    { name: "Samsung Galaxy S23 Ultra", price: "₹44,999", mrp: "₹1,24,999", off: "64% OFF", badge: "⚡ FLASH SALE", ends: "Ends in 5h 12m", emoji: "📱" },
    { name: "MacBook Air M1", price: "₹54,999", mrp: "₹1,09,900", off: "50% OFF", badge: "💻 HOT DEAL", ends: "Ends in 1d 4h", emoji: "💻" },
    { name: "iPad Pro 11\" (2022)", price: "₹42,999", mrp: "₹89,900", off: "52% OFF", badge: "🎯 LIMITED", ends: "Ends in 8h 45m", emoji: "📟" },
    { name: "OnePlus 11 5G 256GB", price: "₹23,999", mrp: "₹56,999", off: "58% OFF", badge: "💥 HOT PICK", ends: "Ends in 3h 20m", emoji: "📱" },
    { name: "Sony WH-1000XM5", price: "₹14,999", mrp: "₹34,990", off: "57% OFF", badge: "🎧 AUDIO DEAL", ends: "Ends in 6h 00m", emoji: "🎧" },
  ];
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <section style={{ background: "linear-gradient(135deg, #1a0505, #2d0a0a)", padding: "64px 16px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 99, padding: "6px 20px", marginBottom: 20 }}>
          <span style={{ background: "#ef4444", borderRadius: "50%", width: 8, height: 8, display: "inline-block", animation: "pulse 1s infinite" }} />
          <span style={{ color: "#ef4444", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>Live Flash Sale</span>
        </div>
        <h1 style={{ color: "#fff", fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, margin: "0 0 12px" }}>🔥 Dhamaka Deals</h1>
        <p style={{ color: "#ff9999", fontSize: 16, margin: 0 }}>Lightning deals updated every hour. Grab them before they're gone!</p>
      </section>
      <section style={{ padding: "64px 16px", background: "#f8f9fa" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {deals.map((d) => (
            <div key={d.name} style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)", height: 160, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, position: "relative" }}>
                {d.emoji}
                <div style={{ position: "absolute", top: 12, left: 12, background: "#ef4444", color: "#fff", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>{d.off}</div>
                <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.6)", color: "#ffcc44", borderRadius: 8, padding: "4px 10px", fontSize: 10, fontWeight: 700 }}>{d.badge}</div>
              </div>
              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.3 }}>{d.name}</h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 24, fontWeight: 900, color: "#0f0f0f" }}>{d.price}</span>
                  <span style={{ fontSize: 14, color: "#aaa", textDecoration: "line-through" }}>{d.mrp}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#ef4444" }}>⏱ {d.ends}</span>
                </div>
                <Link href="/products" style={{ display: "block", background: "linear-gradient(135deg, #42c8b7, #2ea898)", color: "#000", borderRadius: 10, padding: "12px 0", textAlign: "center", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Grab Deal →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
