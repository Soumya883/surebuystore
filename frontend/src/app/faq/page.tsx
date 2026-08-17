import type { Metadata } from "next";
export const metadata: Metadata = { title: "FAQ – SureBuyStore", description: "Frequently asked questions about buying, selling, warranty, and returns at SureBuyStore." };
export default function FaqPage() {
  const faqs = [
    { q: "What does 'certified refurbished' mean?", a: "Certified refurbished means the device has been professionally tested, cleaned, and repaired to meet strict quality standards by our technicians. Each device passes a 50-point quality check before listing." },
    { q: "What warranty do I get?", a: "All devices come with a 6-month SureBuy warranty covering hardware defects and manufacturing faults. Physical damage, water damage, and software issues are excluded." },
    { q: "Can I return a product?", a: "Yes! We offer a 7-day hassle-free return policy from the date of delivery. The device must be in its original condition with all accessories included." },
    { q: "How do I sell my old phone?", a: "Visit the Sell section, select your device model and condition, get an instant price quote, schedule a free pickup, and receive payment within 24 hours of inspection." },
    { q: "What payment methods are accepted?", a: "We accept UPI, Credit/Debit cards, Net Banking, and Cash on Delivery (COD). For COD orders, a 10% advance payment is required online, with the remaining 90% due at delivery." },
    { q: "How long does delivery take?", a: "We offer free pan-India delivery in 3-5 business days. Metro cities typically receive orders in 1-2 days." },
    { q: "Are the phones unlocked?", a: "Yes, all phones on SureBuyStore are SIM-unlocked and work with any carrier in India." },
    { q: "What if I receive a defective product?", a: "If you receive a defective product, contact us within 48 hours of delivery. We'll arrange a free pickup and process a full refund or replacement within 5-7 business days." },
    { q: "Is my payment information secure?", a: "Absolutely. All payments are processed through Razorpay, which is PCI DSS Level 1 certified. We never store your card details on our servers." },
    { q: "Do you have a physical store?", a: "We currently operate online only, which allows us to keep our prices significantly lower than physical stores. We're planning to open service centers in major cities." },
  ];
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #111)", padding: "64px 16px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, margin: "0 0 12px" }}>Frequently Asked Questions</h1>
        <p style={{ color: "#999", fontSize: 16, margin: 0 }}>Everything you need to know about SureBuyStore</p>
      </section>
      <section style={{ padding: "64px 16px", maxWidth: 760, margin: "0 auto" }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ marginBottom: 20, background: "#fff", borderRadius: 14, border: "1px solid #f0f0f0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
            <details>
              <summary style={{ padding: "20px 24px", fontSize: 16, fontWeight: 700, color: "#0f0f0f", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{faq.q}</span>
                <span style={{ color: "#42c8b7", fontSize: 20, flexShrink: 0, marginLeft: 16 }}>+</span>
              </summary>
              <p style={{ margin: 0, padding: "0 24px 20px", color: "#555", lineHeight: 1.7, fontSize: 15, borderTop: "1px solid #f5f5f5" }}>{faq.a}</p>
            </details>
          </div>
        ))}
        <div style={{ background: "linear-gradient(135deg, #0a0a0a, #111)", borderRadius: 16, padding: 32, textAlign: "center", marginTop: 48 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🤔</div>
          <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>Still have questions?</h3>
          <p style={{ color: "#999", margin: "0 0 20px", fontSize: 14 }}>Our support team is here to help!</p>
          <a href="/contact" style={{ display: "inline-block", background: "#42c8b7", color: "#000", padding: "12px 28px", borderRadius: 10, fontWeight: 700, textDecoration: "none", fontSize: 14 }}>Contact Us →</a>
        </div>
      </section>
    </div>
  );
}
