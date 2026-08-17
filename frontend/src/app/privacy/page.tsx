import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy – SureBuyStore", description: "Read our privacy policy to understand how we collect, use, and protect your data." };
export default function PrivacyPage() {
  const sections = [
    { title: "Information We Collect", content: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes your name, email address, phone number, shipping address, and payment information (processed securely via Razorpay)." },
    { title: "How We Use Your Information", content: "We use your information to process transactions, send order confirmations and updates, provide customer support, personalize your experience, send promotional emails (with your consent), and improve our services." },
    { title: "Information Sharing", content: "We do not sell, trade, or otherwise transfer your personally identifiable information to third parties except as necessary to operate our service (e.g., payment processors, shipping partners). All partners are bound by strict confidentiality agreements." },
    { title: "Data Security", content: "We implement industry-standard security measures including SSL encryption, secure payment processing, and regular security audits to protect your personal information from unauthorized access, alteration, disclosure, or destruction." },
    { title: "Cookies", content: "We use cookies to enhance your browsing experience, save your preferences, and analyze site traffic. You can choose to disable cookies through your browser settings, but this may affect certain features of our website." },
    { title: "Your Rights", content: "You have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time. To exercise these rights, contact us at privacy@surebuystore.com." },
    { title: "Contact Us", content: "If you have questions about this privacy policy or our privacy practices, please contact us at privacy@surebuystore.com or call +91 98765 43210." },
  ];
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <section style={{ background: "linear-gradient(135deg, #0a0a0a, #111)", padding: "64px 16px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, margin: "0 0 12px" }}>Privacy Policy</h1>
        <p style={{ color: "#888", fontSize: 14 }}>Last updated: August 2026</p>
      </section>
      <section style={{ padding: "64px 16px", maxWidth: 800, margin: "0 auto" }}>
        <p style={{ color: "#666", lineHeight: 1.8, fontSize: 16, marginBottom: 40 }}>
          At SureBuyStore, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you use our platform.
        </p>
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
