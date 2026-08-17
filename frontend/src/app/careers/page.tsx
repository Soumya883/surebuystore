import Link from "next/link";
export default function CareersPage() {
  const openings = [
    { role: "Senior Software Engineer (Full Stack)", dept: "Engineering", loc: "Bangalore / Remote", type: "Full-Time" },
    { role: "Quality Control Technician", dept: "Operations", loc: "Bangalore", type: "Full-Time" },
    { role: "Product Manager – Marketplace", dept: "Product", loc: "Bangalore / Remote", type: "Full-Time" },
    { role: "Customer Success Executive", dept: "Support", loc: "Bangalore / WFH", type: "Full-Time" },
    { role: "Digital Marketing Specialist", dept: "Marketing", loc: "Remote", type: "Full-Time" },
    { role: "Data Analyst", dept: "Analytics", loc: "Bangalore / Remote", type: "Full-Time" },
  ];
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #111)", padding: "80px 16px", textAlign: "center" }}>
        <span style={{ display: "inline-block", background: "rgba(66,200,183,0.15)", border: "1px solid rgba(66,200,183,0.3)", color: "#42c8b7", borderRadius: 99, padding: "4px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>We're Hiring!</span>
        <h1 style={{ color: "#fff", fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, margin: "0 0 16px" }}>Join the SureBuy Team</h1>
        <p style={{ color: "#999", fontSize: 17, margin: 0, maxWidth: 600, display: "block", marginLeft: "auto", marginRight: "auto" }}>Help us make certified refurbished electronics accessible to every Indian. Work on challenging problems, grow fast, and make an impact.</p>
      </section>

      {/* Values */}
      <section style={{ padding: "64px 16px", background: "#f8f9fa" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: "center", margin: "0 0 48px" }}>Why Work With Us?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {[
              { emoji: "🚀", title: "Fast Growth", desc: "Growing 3x year-on-year. Your career grows with us." },
              { emoji: "💡", title: "Ownership", desc: "Take ownership of real problems from day one." },
              { emoji: "🏠", title: "Flexible Work", desc: "Remote-first culture with flexible working hours." },
              { emoji: "💰", title: "Great Pay", desc: "Competitive salaries with ESOPs for early joiners." },
              { emoji: "🎓", title: "Learning Budget", desc: "₹50,000/year for courses, conferences, and books." },
              { emoji: "❤️", title: "Health Benefits", desc: "Comprehensive health insurance for you and family." },
            ].map((v) => (
              <div key={v.title} style={{ background: "#fff", borderRadius: 14, padding: 28, border: "1px solid #f0f0f0", textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{v.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{v.title}</div>
                <div style={{ color: "#888", fontSize: 13, lineHeight: 1.5 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section style={{ padding: "64px 16px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 36px" }}>Open Positions</h2>
          <div style={{ display: "grid", gap: 16 }}>
            {openings.map((j) => (
              <div key={j.role} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8f9fa", borderRadius: 14, padding: "24px 28px", border: "1px solid #f0f0f0", gap: 16, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{j.role}</div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ background: "rgba(66,200,183,0.1)", color: "#42c8b7", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>{j.dept}</span>
                    <span style={{ color: "#888", fontSize: 13 }}>📍 {j.loc}</span>
                    <span style={{ color: "#888", fontSize: 13 }}>🕐 {j.type}</span>
                  </div>
                </div>
                <a href="mailto:careers@surebuystore.com" style={{ background: "linear-gradient(135deg, #42c8b7, #2ea898)", color: "#000", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 13, textDecoration: "none", whiteSpace: "nowrap" }}>Apply Now →</a>
              </div>
            ))}
          </div>
          <p style={{ color: "#888", textAlign: "center", marginTop: 32, fontSize: 14 }}>Don't see a role? Email us at <a href="mailto:careers@surebuystore.com" style={{ color: "#42c8b7" }}>careers@surebuystore.com</a></p>
        </div>
      </section>
    </div>
  );
}
