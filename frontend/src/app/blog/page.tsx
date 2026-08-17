import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Blog – SureBuyStore | Tech Tips & Buying Guides", description: "Read the latest tech tips, buying guides, and refurbished phone reviews from SureBuyStore." };

const ARTICLES = [
  { title: "Best Budget Smartphones Under ₹20,000 in 2024", cat: "Buying Guide", date: "Aug 12, 2026", read: "5 min", emoji: "📱", desc: "We've rounded up the top refurbished smartphones that offer incredible value under ₹20,000." },
  { title: "How to Sell Your Old iPhone and Get the Best Price", cat: "Selling Tips", date: "Aug 8, 2026", read: "4 min", emoji: "💰", desc: "Follow these expert tips to maximize your payout when selling your used iPhone." },
  { title: "Samsung vs Apple: Which Brand Holds Value Better?", cat: "Comparison", date: "Aug 5, 2026", read: "7 min", emoji: "⚖️", desc: "A deep dive into resale values of Samsung and Apple phones over 2-3 years of use." },
  { title: "Top 5 Refurbished Phones Worth Buying in 2024", cat: "Top Picks", date: "Aug 1, 2026", read: "6 min", emoji: "🏆", desc: "Our experts picked the 5 best refurbished phones offering the best bang for your buck." },
  { title: "What Does 'Certified Refurbished' Actually Mean?", cat: "Education", date: "Jul 28, 2026", read: "3 min", emoji: "✅", desc: "Clearing the confusion around refurbished vs. used vs. renewed devices." },
  { title: "OnePlus 11 5G Review: Still Worth It in 2024?", cat: "Review", date: "Jul 22, 2026", read: "8 min", emoji: "⚡", desc: "We tested the OnePlus 11 5G thoroughly. Here's our verdict for 2024 buyers." },
];

export default function BlogPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #111)", padding: "64px 16px", textAlign: "center" }}>
        <span style={{ display: "inline-block", background: "rgba(66,200,183,0.15)", border: "1px solid rgba(66,200,183,0.3)", color: "#42c8b7", borderRadius: 99, padding: "4px 16px", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Blog & Tips</span>
        <h1 style={{ color: "#fff", fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, margin: "0 0 12px" }}>Tech Guides & Tips</h1>
        <p style={{ color: "#999", fontSize: 16, margin: 0 }}>Expert advice on buying, selling and caring for your devices</p>
      </section>
      <section style={{ padding: "64px 16px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28 }}>
          {ARTICLES.map((a) => (
            <article key={a.title} style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "transform 200ms, box-shadow 200ms" }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}>
              <div style={{ background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)", height: 140, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60 }}>{a.emoji}</div>
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
                  <span style={{ background: "rgba(66,200,183,0.1)", color: "#42c8b7", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{a.cat}</span>
                  <span style={{ color: "#ccc", fontSize: 11 }}>•</span>
                  <span style={{ color: "#aaa", fontSize: 11 }}>{a.date}</span>
                  <span style={{ color: "#ccc", fontSize: 11 }}>•</span>
                  <span style={{ color: "#aaa", fontSize: 11 }}>{a.read} read</span>
                </div>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0f0f0f", margin: "0 0 10px", lineHeight: 1.4 }}>{a.title}</h2>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, margin: "0 0 16px" }}>{a.desc}</p>
                <span style={{ color: "#42c8b7", fontSize: 13, fontWeight: 700 }}>Read More →</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
