import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service – SureBuyStore", description: "Read our terms and conditions for using SureBuyStore." };
export default function TermsPage() {
  const sections = [
    { title: "Acceptance of Terms", content: "By accessing or using SureBuyStore, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform." },
    { title: "User Accounts", content: "You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account and all activities that occur under it. Notify us immediately of any unauthorized use." },
    { title: "Buying & Selling", content: "All products listed on SureBuyStore are certified refurbished unless otherwise stated. Prices are in Indian Rupees (INR) and inclusive of GST. We reserve the right to refuse or cancel orders at our discretion." },
    { title: "Payment Terms", content: "Payments are processed securely via Razorpay. For COD orders, a 10% advance payment is required at checkout; the remaining 90% is due upon delivery. All payments are non-refundable except as per our Return Policy." },
    { title: "Returns & Refunds", content: "We offer a 7-day return policy from delivery date. Devices must be in original condition with all accessories. Refunds are processed within 5-7 business days to the original payment method. Certain categories are non-returnable." },
    { title: "Warranty", content: "All purchased devices come with a 6-month SureBuy warranty covering manufacturing defects and hardware failures. Physical damage, water damage, and software issues are not covered under warranty." },
    { title: "Limitation of Liability", content: "SureBuyStore's liability is limited to the purchase price of the product. We are not liable for indirect, incidental, or consequential damages arising from the use of our platform or products." },
    { title: "Governing Law", content: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bangalore, Karnataka." },
  ];
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #111)", padding: "64px 16px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, margin: "0 0 12px" }}>Terms of Service</h1>
        <p style={{ color: "#888", fontSize: 14 }}>Last updated: August 2026</p>
      </section>
      <section style={{ padding: "64px 16px", maxWidth: 800, margin: "0 auto" }}>
        {sections.map((s, i) => (
          <div key={s.title} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f0f0f", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ background: "#42c8b7", color: "#000", borderRadius: 8, width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, flexShrink: 0 }}>{i + 1}</span>
              {s.title}
            </h2>
            <p style={{ color: "#555", lineHeight: 1.8, fontSize: 15, margin: 0, paddingLeft: 38 }}>{s.content}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
