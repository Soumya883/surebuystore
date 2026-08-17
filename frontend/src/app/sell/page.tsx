"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Search,
  ChevronRight,
  Truck,
  ShieldCheck,
  Banknote,
  Clock,
  Star,
  MapPin,
  CheckCircle2,
} from "lucide-react";

const BRANDS = [
  { id: 1, name: "Apple",    src: "https://cdn2.clevup.in/111129/cat/1645555371511_114304_cat.png?width=384&format=webp" },
  { id: 2, name: "Samsung",  src: "https://cdn2.clevup.in/111129/cat/1645278560873_114304_cat.png?width=384&format=webp" },
  { id: 3, name: "OnePlus",  src: "https://cdn2.clevup.in/111129/cat/1644584492225_114304_cat.png?width=384&format=webp" },
  { id: 4, name: "Xiaomi",   src: "https://cdn2.clevup.in/111129/cat/1645620352255_114304_cat.png?width=384&format=webp" },
  { id: 5, name: "Oppo",     src: "https://cdn2.clevup.in/111129/cat/1644584657851_114304_cat.png?width=384&format=webp" },
  { id: 6, name: "Vivo",     src: "https://cdn2.clevup.in/111129/cat/1644584730219_114304_cat.png?width=384&format=webp" },
  { id: 7, name: "Realme",   src: "https://cdn2.clevup.in/111129/cat/1658918058879_114304_cat.png?width=384&format=webp" },
  { id: 8, name: "Nokia",    src: "https://cdn2.clevup.in/111129/cat/1644584755931_114304_cat.png?width=384&format=webp" },
  { id: 9, name: "Google",   src: "https://cdn2.clevup.in/111129/cat/1644593699942_114304_cat.png?width=384&format=webp" },
  { id: 10, name: "Motorola",src: "https://cdn2.clevup.in/111129/cat/1644584709733_114304_cat.png?width=384&format=webp" },
  { id: 11, name: "Nothing", src: "https://cdn2.clevup.in/111129/cat/1644584804052_114304_cat.png?width=384&format=webp" },
];

const TOP_PHONES = [
  { id: "p1",  name: "Apple iPhone 14 Pro",      price: "Up to ₹48,000", img: "https://cdn2.clevup.in/111129/1676810296715_SKU-0131_0.jpg?width=600&format=webp",   rating: 4.9, sold: "3.2k sold" },
  { id: "p2",  name: "Apple iPhone 13",          price: "Up to ₹32,000", img: "https://cdn2.clevup.in/111129/1663421580279_SKU-0119_0.jpg?width=600&format=webp",   rating: 4.8, sold: "5.1k sold" },
  { id: "p3",  name: "Apple iPhone 12",          price: "Up to ₹22,000", img: "https://cdn2.clevup.in/111129/1663240526734_SKU-0118_0.jpg?width=600&format=webp",   rating: 4.7, sold: "8.3k sold" },
  { id: "p4",  name: "Samsung Galaxy S23",       price: "Up to ₹35,000", img: "https://cdn2.clevup.in/111129/1662733475266_SKU-0117_0.jpg?width=600&format=webp",   rating: 4.7, sold: "2.8k sold" },
  { id: "p5",  name: "Samsung Galaxy S22",       price: "Up to ₹28,000", img: "https://cdn2.clevup.in/111129/1662544083730_SKU-0116_0.jpg?width=600&format=webp",   rating: 4.6, sold: "4.2k sold" },
  { id: "p6",  name: "OnePlus 11",               price: "Up to ₹24,000", img: "https://cdn2.clevup.in/111129/1662733715347_SKU-0113_0.jpg?width=600&format=webp",   rating: 4.7, sold: "1.9k sold" },
  { id: "p7",  name: "OnePlus 9 Pro",            price: "Up to ₹18,000", img: "https://cdn2.clevup.in/111129/1662366813036_SKU-0110_0.jpg?width=600&format=webp",   rating: 4.5, sold: "3.7k sold" },
  { id: "p8",  name: "Xiaomi 13 Pro",            price: "Up to ₹26,000", img: "https://cdn2.clevup.in/111129/1662365143682_SKU-0106_0.jpg?width=600&format=webp",   rating: 4.6, sold: "1.5k sold" },
];

const HOW_IT_WORKS = [
  { step: "01", icon: Search,       title: "Select Your Device",  desc: "Choose your brand, model, storage, and condition from our easy-to-use wizard." },
  { step: "02", icon: MapPin,       title: "Get Instant Quote",   desc: "Receive the best market price for your device instantly." },
  { step: "03", icon: Truck,        title: "Free Doorstep Pickup",desc: "Our executive comes to your home or office at your preferred time slot." },
  { step: "04", icon: Banknote,     title: "Get Paid Instantly",  desc: "Receive payment via UPI, bank transfer, or cash right after inspection." },
];

const TRUST_POINTS = [
  { icon: ShieldCheck, label: "Safe & Secure",       sub: "100% verified process"   },
  { icon: Clock,       label: "2-Hour Pickup",        sub: "Same day service"        },
  { icon: Banknote,    label: "Best Price",           sub: "Market-best valuations"  },
  { icon: CheckCircle2,label: "No Hidden Charges",   sub: "What we quote, we pay"   },
];

const REVIEWS = [
  { name: "Rohit M.", rating: 5, text: "Got ₹29,000 for my iPhone 12. Process was super smooth, pickup was in 45 minutes!", city: "Bangalore" },
  { name: "Priya K.", rating: 5, text: "The agent came home, inspected the device carefully and paid me the exact amount quoted online.", city: "Mumbai" },
  { name: "Aditya S.", rating: 4, text: "Great experience selling my OnePlus 9. The price I got was way better than trade-in from the OEM.", city: "Hyderabad" },
];

export default function SellDevicePage() {
  const [query, setQuery] = useState("");
  const [activeBrand, setActiveBrand] = useState<number | null>(null);

  const filtered = TOP_PHONES.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) || query === ""
  );

  return (
    <div style={{ background: "#f7f8f9", color: "#0f0f0f", fontFamily: "Inter, system-ui, sans-serif", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%)", padding: "72px 16px 80px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>

          {/* badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(66,200,183,0.12)", border: "1px solid rgba(66,200,183,0.3)", borderRadius: 9999, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#42c8b7", display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 13, color: "#42c8b7", fontWeight: 600 }}>Live Price Available · 10,000+ Devices Sold</span>
          </div>

          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-0.02em", color: "#0f172a" }}>
            Sell Old Mobile Phone &amp;<br />
            <span style={{ color: "#42c8b7" }}>Get Instant Cash At Doorstep</span>
          </h1>

          <p style={{ fontSize: 16, color: "#707070", maxWidth: 500, margin: "0 auto 40px" }}>
            Get the best price for your old smartphone in 3 simple steps. Free pickup. Instant payment.
          </p>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}>
            <Search style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "#707070", width: 20, height: 20 }} aria-hidden />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your phone model e.g. iPhone 13, Samsung S22…"
              aria-label="Search mobile phone model"
              style={{
                width: "100%",
                boxSizing: "border-box",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                color: "#0f172a",
                fontSize: 15,
                padding: "18px 18px 18px 52px",
                outline: "none",
                transition: "border-color 150ms",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#42c8b7"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(66,200,183,0.2)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.05)"; }}
            />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "64px 16px", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#42c8b7", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, textAlign: "center" }}>Simple Process</p>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 700, color: "#0f172a", textAlign: "center", marginBottom: 48 }}>How It Works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc }) => (
              <div key={step} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 16, right: 20, fontSize: 48, fontWeight: 900, color: "rgba(66,200,183,0.1)", lineHeight: 1 }}>{step}</div>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(66,200,183,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon size={22} style={{ color: "#42c8b7" }} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, color: "#707070", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section style={{ padding: "64px 16px", background: "#f7f8f9" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#42c8b7", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Step 1</p>
          <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#0f172a", marginBottom: 32 }}>Select Your Brand</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 12 }}>
            {BRANDS.map((brand) => (
              <button
                key={brand.id}
                onClick={() => setActiveBrand(activeBrand === brand.id ? null : brand.id)}
                aria-pressed={activeBrand === brand.id}
                aria-label={`Select ${brand.name}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  padding: "20px 12px",
                  background: activeBrand === brand.id ? "#f0fdfa" : "#ffffff",
                  border: `1.5px solid ${activeBrand === brand.id ? "#42c8b7" : "#e2e8f0"}`,
                  borderRadius: 16,
                  cursor: "pointer",
                  transition: "all 150ms",
                  outline: "none",
                  minHeight: 44,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                }}
                onMouseEnter={(e) => { if (activeBrand !== brand.id) { e.currentTarget.style.borderColor = "#42c8b7"; e.currentTarget.style.background = "#f0fdfa"; }}}
                onMouseLeave={(e) => { if (activeBrand !== brand.id) { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#ffffff"; }}}
                onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(66,200,183,0.25)"; }}
                onBlur={(e) => { e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)"; }}
              >
                <div style={{ position: "relative", width: 52, height: 52 }}>
                  <Image src={brand.src} alt={brand.name} fill style={{ objectFit: "contain" }} sizes="52px" />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: activeBrand === brand.id ? "#0f172a" : "#475569" }}>
                  {brand.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP MODELS ── */}
      <section style={{ padding: "64px 16px", background: "#ffffff", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#42c8b7", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Most Popular</p>
              <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#0f172a" }}>Top Selling Models</h2>
            </div>
            {query && (
              <span style={{ fontSize: 13, color: "#707070" }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;</span>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {filtered.map((phone) => (
              <div
                key={phone.id}
                style={{ background: "#ffffff", border: "1.5px solid #e2e8f0", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", transition: "border-color 200ms, box-shadow 200ms", cursor: "pointer" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#42c8b7"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 20px rgba(0,0,0,0.05)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e2e8f0"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                {/* image */}
                <div style={{ position: "relative", height: 180, background: "#f8fafc" }}>
                  <Image src={phone.img} alt={phone.name} fill style={{ objectFit: "contain", padding: "16px" }} sizes="(max-width: 640px) 50vw, 220px" />
                </div>

                {/* body */}
                <div style={{ padding: "16px 16px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid #e2e8f0" }}>
                  {/* rating + sold */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Star size={12} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                    <span style={{ fontSize: 12, color: "#64748b" }}>{phone.rating} · {phone.sold}</span>
                  </div>

                  <h3 style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>{phone.name}</h3>

                  <div style={{ fontSize: 16, fontWeight: 800, color: "#42c8b7", marginTop: 4 }}>{phone.price}</div>

                  <button
                    className="cashify-btn-primary"
                    aria-label={`Get exact value for ${phone.name}`}
                    style={{ marginTop: "auto", paddingTop: 12, paddingBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", borderRadius: 10, cursor: "pointer" }}
                  >
                    Get Exact Value <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* empty state */}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "64px 0", color: "#707070" }}>
              <Search size={40} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
              <p style={{ fontSize: 16 }}>No results found for &ldquo;{query}&rdquo;</p>
              <p style={{ fontSize: 13, marginTop: 8 }}>Try a different brand or model name.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section style={{ padding: "48px 16px", background: "linear-gradient(90deg, #0a1a18 0%, #001a12 100%)", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24 }}>
            {TRUST_POINTS.map(({ icon: Icon, label, sub }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(66,200,183,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={22} style={{ color: "#42c8b7" }} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{label}</div>
                  <div style={{ fontSize: 12, color: "#707070", marginTop: 2 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section style={{ padding: "64px 16px", background: "#ffffff" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#42c8b7", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, textAlign: "center" }}>What Customers Say</p>
          <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#0f172a", textAlign: "center", marginBottom: 40 }}>Trusted by Thousands</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {REVIEWS.map((r) => (
              <div key={r.name} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={14} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                  ))}
                </div>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, marginBottom: 16 }}>&ldquo;{r.text}&rdquo;</p>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{r.name} <span style={{ color: "#94a3b8", fontWeight: 400 }}>— {r.city}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAYMENTS ── */}
      <section style={{ padding: "48px 16px 64px", background: "#0a0a0a", borderTop: "1px solid #1a1a1a", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#42c8b7", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Secure Payments</p>
          <div style={{ position: "relative", width: "100%", height: 56, filter: "brightness(1.4)" }}>
            <Image
              src="https://img.clevup.in/static/web-store/payment-methods.png"
              alt="Accepted payment methods: UPI, NEFT, Amazon Pay, Paytm, cash"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <p style={{ fontSize: 12, color: "#707070", marginTop: 16 }}>Your payment is guaranteed. No deductions. No tricks.</p>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding: "72px 16px", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", color: "#fff", fontWeight: 800, marginBottom: 16 }}>
          Ready to sell your old phone?
        </h2>
        <p style={{ fontSize: 16, color: "#cbd5e1", marginBottom: 36 }}>
          Join 10,000+ happy customers who got the best price for their device.
        </p>
        <button
          className="cashify-btn-primary"
          aria-label="Get price for your device"
          style={{ padding: "18px 40px", fontSize: 16, borderRadius: 9999, display: "inline-flex", gap: 8, alignItems: "center" }}
        >
          Get Your Device Price <ChevronRight size={20} />
        </button>
      </section>
    </div>
  );
}
