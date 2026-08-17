"use client";
import { useState } from "react";
import type { Metadata } from "next";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111 100%)", padding: "64px 16px", textAlign: "center" }}>
        <span style={{ display: "inline-block", background: "rgba(66,200,183,0.15)", border: "1px solid rgba(66,200,183,0.3)", color: "#42c8b7", borderRadius: 99, padding: "4px 16px", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Get In Touch</span>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#fff", margin: "0 0 16px" }}>We're Here to Help</h1>
        <p style={{ color: "#999", fontSize: 16, margin: 0 }}>Our team responds within 2 hours on business days.</p>
      </section>

      <section style={{ padding: "72px 16px", background: "#f8f9fa" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 64 }}>
          {/* Contact Info */}
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 32px" }}>Contact Information</h2>
            {[
              { icon: "📧", label: "Email", value: "support@surebuystore.com" },
              { icon: "📞", label: "Phone", value: "+91 98765 43210" },
              { icon: "📍", label: "Address", value: "SureBuyStore, MG Road, Bangalore — 560001" },
              { icon: "⏰", label: "Hours", value: "Mon–Sat, 9AM–7PM IST" },
            ].map((c) => (
              <div key={c.label} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 28 }}>
                <div style={{ width: 48, height: 48, background: "rgba(66,200,183,0.1)", border: "1px solid rgba(66,200,183,0.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#42c8b7", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{c.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#0f0f0f" }}>{c.value}</div>
                </div>
              </div>
            ))}

            <div style={{ background: "linear-gradient(135deg, #0a0a0a, #111)", borderRadius: 16, padding: 24, marginTop: 32 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#42c8b7", marginBottom: 8 }}>💬 Live Chat</div>
              <div style={{ fontSize: 14, color: "#999", marginBottom: 16 }}>Chat with our support team instantly</div>
              <button style={{ background: "#42c8b7", color: "#000", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Start Chat</button>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 40, border: "1px solid #f0f0f0", boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 12px" }}>Message Sent!</h3>
                <p style={{ color: "#666", margin: "0 0 24px" }}>We'll get back to you within 2 business hours.</p>
                <button onClick={() => setSubmitted(false)} style={{ background: "#42c8b7", color: "#000", border: "none", borderRadius: 10, padding: "12px 24px", fontWeight: 700, cursor: "pointer" }}>Send Another Message</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 28px" }}>Send us a Message</h3>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {[
                      { label: "Your Name", key: "name", type: "text", placeholder: "John Doe" },
                      { label: "Phone Number", key: "phone", type: "tel", placeholder: "+91 98765 43210" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#888", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.label}</label>
                        <input type={f.type} value={form[f.key as keyof typeof form]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} required style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #eee", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#888", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #eee", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#888", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Subject</label>
                    <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #eee", borderRadius: 10, fontSize: 14, outline: "none", background: "#fff", boxSizing: "border-box" }}>
                      <option value="">Select a subject</option>
                      <option>Order Issue</option>
                      <option>Product Question</option>
                      <option>Sell My Device</option>
                      <option>Return / Refund</option>
                      <option>Warranty Claim</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#888", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Message</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us how we can help..." rows={5} required style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #eee", borderRadius: 10, fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
                  </div>
                  <button type="submit" disabled={loading} style={{ background: "linear-gradient(135deg, #42c8b7, #2ea898)", color: "#000", border: "none", borderRadius: 12, padding: "14px 0", fontWeight: 700, fontSize: 15, cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
                    {loading ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
