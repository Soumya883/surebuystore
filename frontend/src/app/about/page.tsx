import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us – SureBuyStore | India's Trusted Refurbished Device Store",
  description: "Learn about SureBuyStore — India's most trusted platform for buying and selling certified refurbished smartphones and electronics.",
};

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#0f0f0f" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111 100%)", padding: "80px 16px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <span style={{ display: "inline-block", background: "rgba(66,200,183,0.15)", border: "1px solid rgba(66,200,183,0.3)", color: "#42c8b7", borderRadius: 99, padding: "4px 16px", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Our Story</span>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#fff", margin: "0 0 20px" }}>
            We Make Refurbished <span style={{ color: "#42c8b7" }}>Trustworthy</span>
          </h1>
          <p style={{ fontSize: 17, color: "#999", lineHeight: 1.7, margin: 0 }}>
            SureBuyStore was founded with a simple mission: make certified refurbished electronics accessible, affordable, and completely trustworthy for every Indian household.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#42c8b7", padding: "48px 16px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, textAlign: "center" }}>
          {[
            { number: "50,000+", label: "Happy Customers" },
            { number: "1,00,000+", label: "Devices Sold" },
            { number: "6 Months", label: "Warranty" },
            { number: "50-Point", label: "Quality Check" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#0a0a0a" }}>{s.number}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(0,0,0,0.6)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "72px 16px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 36, fontWeight: 800, margin: "0 0 16px" }}>Why We Exist</h2>
            <p style={{ color: "#666", lineHeight: 1.8, fontSize: 16, margin: "0 0 16px" }}>
              Millions of Indians dream of owning premium smartphones but are held back by prices. At the same time, millions of used devices sit idle. We bridge this gap.
            </p>
            <p style={{ color: "#666", lineHeight: 1.8, fontSize: 16, margin: 0 }}>
              Every device on SureBuyStore goes through a rigorous 50-point quality check by our certified technicians. We don't just refurbish — we certify, warranty, and stand behind every sale.
            </p>
          </div>
          <div style={{ display: "grid", gap: 16 }}>
            {["Certified Quality", "6-Month Warranty", "7-Day Easy Returns", "Free Pan-India Delivery", "Instant Sell Price", "100% Secure Payments"].map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", background: "#f8f9fa", borderRadius: 12, border: "1px solid #f0f0f0" }}>
                <span style={{ color: "#42c8b7", fontSize: 20 }}>✓</span>
                <span style={{ fontWeight: 600, fontSize: 15 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "72px 16px", background: "#f8f9fa" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, margin: "0 0 48px" }}>Leadership Team</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {[
              { name: "Rahul Mehta", role: "CEO & Founder", emoji: "👨‍💼" },
              { name: "Priya Sharma", role: "Head of Quality", emoji: "👩‍🔬" },
              { name: "Aditya Kumar", role: "CTO", emoji: "👨‍💻" },
              { name: "Sneha Verma", role: "Head of Operations", emoji: "👩‍💼" },
            ].map((p) => (
              <div key={p.name} style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #f0f0f0", textAlign: "center" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>{p.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 17 }}>{p.name}</div>
                <div style={{ color: "#42c8b7", fontSize: 13, fontWeight: 600, marginTop: 4 }}>{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111 100%)", padding: "72px 16px", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 800, margin: "0 0 20px" }}>Join 50,000+ Happy Customers</h2>
        <p style={{ color: "#999", fontSize: 16, margin: "0 0 32px" }}>Buy certified, sell easy, save big.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/products" style={{ background: "#42c8b7", color: "#000", padding: "14px 32px", borderRadius: 12, fontWeight: 700, textDecoration: "none", fontSize: 15 }}>Shop Now</Link>
          <Link href="/contact" style={{ background: "transparent", color: "#fff", padding: "14px 32px", borderRadius: 12, fontWeight: 700, textDecoration: "none", fontSize: 15, border: "1px solid rgba(255,255,255,0.2)" }}>Contact Us</Link>
        </div>
      </section>
    </div>
  );
}
