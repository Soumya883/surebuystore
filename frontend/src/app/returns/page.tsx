import type { Metadata } from "next";
export const metadata: Metadata = { title: "Returns & Refunds – SureBuyStore", description: "Learn about our 7-day return policy and hassle-free refund process." };
export default function ReturnsPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #111)", padding: "64px 16px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, margin: "0 0 12px" }}>Returns & Refunds</h1>
        <p style={{ color: "#999", fontSize: 16, margin: 0 }}>7-day hassle-free returns. No questions asked.</p>
      </section>
      <section style={{ padding: "64px 16px", maxWidth: 900, margin: "0 auto" }}>
        {/* Policy Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 56 }}>
          {[
            { emoji: "📦", title: "7-Day Returns", desc: "Return any product within 7 days of delivery" },
            { emoji: "💸", title: "Full Refund", desc: "Get 100% of your money back, no deductions" },
            { emoji: "🚚", title: "Free Pickup", desc: "We'll arrange a free pickup from your doorstep" },
            { emoji: "⚡", title: "Fast Processing", desc: "Refunds processed within 5-7 business days" },
          ].map((c) => (
            <div key={c.title} style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #f0f0f0", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{c.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: "#888", fontSize: 13, lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        {/* How to Return */}
        <h2 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 32px" }}>How to Return</h2>
        <div style={{ display: "grid", gap: 20, marginBottom: 56 }}>
          {[
            { step: "1", title: "Initiate Return", desc: "Log in to your account, go to My Orders, select the order, and click 'Return Item'." },
            { step: "2", title: "Select Reason", desc: "Choose the reason for return from the dropdown and provide additional details if needed." },
            { step: "3", title: "Schedule Pickup", desc: "Select your preferred pickup date and time. We'll send a courier to collect the package." },
            { step: "4", title: "Get Refund", desc: "Once we receive and inspect the device, your refund is processed within 5-7 business days." },
          ].map((s) => (
            <div key={s.step} style={{ display: "flex", gap: 20, alignItems: "flex-start", background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #f0f0f0" }}>
              <div style={{ background: "#42c8b7", color: "#000", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, flexShrink: 0 }}>{s.step}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{s.title}</div>
                <div style={{ color: "#666", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Non-returnable */}
        <div style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 14, padding: 28, marginBottom: 40 }}>
          <h3 style={{ fontWeight: 700, color: "#dc2626", margin: "0 0 16px", fontSize: 18 }}>⚠️ Non-Returnable Items</h3>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#555", lineHeight: 2, fontSize: 14 }}>
            <li>Items with physical damage caused after delivery</li>
            <li>Items with missing accessories or original packaging</li>
            <li>Items returned after the 7-day window</li>
            <li>Software/firmware related issues (covered under warranty)</li>
          </ul>
        </div>

        <div style={{ background: "linear-gradient(135deg, #0a0a0a, #111)", borderRadius: 16, padding: 32, textAlign: "center" }}>
          <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>Need Help with a Return?</h3>
          <p style={{ color: "#999", margin: "0 0 20px", fontSize: 14 }}>Our team is ready to assist you 7 days a week</p>
          <a href="/contact" style={{ display: "inline-block", background: "#42c8b7", color: "#000", padding: "12px 28px", borderRadius: 10, fontWeight: 700, textDecoration: "none", fontSize: 14 }}>Contact Support</a>
        </div>
      </section>
    </div>
  );
}
