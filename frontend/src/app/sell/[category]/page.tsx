import Link from "next/link";
import { redirect } from "next/navigation";

const CATEGORY_DATA: Record<string, { title: string; emoji: string; desc: string; items: string[] }> = {
  laptop:     { title: "Sell Your Laptop", emoji: "💻", desc: "Get the best instant price for your used laptop.", items: ["MacBook Air", "MacBook Pro", "Dell XPS", "HP Pavilion", "Lenovo ThinkPad", "Asus ROG", "Acer Aspire"] },
  tablet:     { title: "Sell Your Tablet", emoji: "📟", desc: "Turn your old tablet into instant cash.", items: ["iPad Pro", "iPad Air", "iPad Mini", "Samsung Galaxy Tab", "OnePlus Pad", "Lenovo Tab"] },
  smartwatch: { title: "Sell Your Smartwatch", emoji: "⌚", desc: "Get instant quotes for your smartwatch.", items: ["Apple Watch Series 9", "Apple Watch Ultra", "Samsung Galaxy Watch", "Garmin", "Fitbit"] },
  tv:         { title: "Sell Your TV", emoji: "📺", desc: "Sell your old TV hassle-free.", items: ["Samsung QLED", "LG OLED", "Sony Bravia", "OnePlus TV", "Mi TV", "Hisense"] },
  camera:     { title: "Sell Your Camera", emoji: "📷", desc: "Best prices for your camera gear.", items: ["Canon EOS", "Nikon D Series", "Sony Alpha", "Fujifilm X", "GoPro", "DJI Osmo"] },
  audio:      { title: "Sell Your Audio", emoji: "🎧", desc: "Instant quotes for headphones & speakers.", items: ["Sony WH-1000XM5", "Bose QC45", "AirPods Pro", "JBL Speaker", "Sonos"] },
  gaming:     { title: "Sell Your Gaming Gear", emoji: "🎮", desc: "Get top value for your gaming equipment.", items: ["PlayStation 5", "Xbox Series X", "Nintendo Switch", "Gaming PC", "Gaming Laptop", "Controllers"] },
};

export default function SellCategoryPage({ params }: { params: { category: string } }) {
  const cat = CATEGORY_DATA[params.category];
  if (!cat) redirect("/sell");

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #111)", padding: "64px 16px", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>{cat.emoji}</div>
        <h1 style={{ color: "#fff", fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, margin: "0 0 12px" }}>{cat.title}</h1>
        <p style={{ color: "#999", fontSize: 16, margin: "0 0 28px" }}>{cat.desc}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {["🔒 Secure", "💸 Instant Pay", "🚚 Free Pickup", "⚡ 24h Transfer"].map(b => (
            <span key={b} style={{ background: "rgba(66,200,183,0.1)", border: "1px solid rgba(66,200,183,0.2)", color: "#42c8b7", borderRadius: 99, padding: "6px 16px", fontSize: 12, fontWeight: 700 }}>{b}</span>
          ))}
        </div>
      </section>

      <section style={{ padding: "64px 16px", background: "#f8f9fa" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 28px", textAlign: "center" }}>Select Your Device</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginBottom: 48 }}>
            {cat.items.map((item) => (
              <Link key={item} href="/sell" style={{ textDecoration: "none" }}>
                <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #f0f0f0", padding: "20px 16px", textAlign: "center", fontWeight: 600, fontSize: 14, color: "#0f0f0f", transition: "all 200ms", cursor: "pointer" }}
                  onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = "#42c8b7"; (e.currentTarget as HTMLElement).style.background = "rgba(66,200,183,0.05)"; }}
                  onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = "#f0f0f0"; (e.currentTarget as HTMLElement).style.background = "#fff"; }}>
                  {cat.emoji} {item}
                </div>
              </Link>
            ))}
          </div>

          {/* How it works */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 40, border: "1px solid #f0f0f0" }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 28px", textAlign: "center" }}>How It Works</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24 }}>
              {[
                { step: "1", title: "Get Quote", desc: "Answer a few questions and get your instant price" },
                { step: "2", title: "Schedule Pickup", desc: "Choose a convenient date and time for free pickup" },
                { step: "3", title: "Inspection", desc: "Our expert inspects the device at your doorstep" },
                { step: "4", title: "Get Paid", desc: "Instant UPI / Bank transfer within 24 hours" },
              ].map((s) => (
                <div key={s.step} style={{ textAlign: "center" }}>
                  <div style={{ background: "#42c8b7", color: "#000", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, margin: "0 auto 12px" }}>{s.step}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{s.title}</div>
                  <div style={{ color: "#888", fontSize: 13, lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <Link href="/sell" style={{ display: "inline-block", background: "linear-gradient(135deg, #42c8b7, #2ea898)", color: "#000", padding: "14px 36px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Get Instant Quote →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
