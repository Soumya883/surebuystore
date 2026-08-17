"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Tab = "login" | "register";

export default function AuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleAdminDemo = () => {
    setLoginEmail("admin@surebuy.com");
    setLoginPassword("admin123");
  };

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const API_BASE = "http://localhost:3001";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: regName, email: regEmail, password: regPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0d1117 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/">
            <div style={{ position: "relative", width: 180, height: 52, margin: "0 auto" }}>
              <Image
                src="https://cdn2.clevup.in/111129/1644850958193_114304_logo.jpg?height=200&format=webp"
                alt="SureBuy"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </Link>
          <p style={{ color: "#666", fontSize: 13, marginTop: 8 }}>Buy Smart, Save More</p>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "32px 36px",
          backdropFilter: "blur(20px)",
        }}>
          {/* Tabs */}
          <div style={{
            display: "flex",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 12,
            padding: 4,
            marginBottom: 28,
          }}>
            {(["login", "register"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); }}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  borderRadius: 9,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                  transition: "all 200ms",
                  background: tab === t ? "#42c8b7" : "transparent",
                  color: tab === t ? "#0a0a0a" : "#888",
                }}
              >
                {t === "login" ? "Login" : "Create Account"}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 10,
              padding: "12px 16px",
              color: "#f87171",
              fontSize: 13,
              marginBottom: 20,
            }}>
              {error}
            </div>
          )}

          {/* Login Form */}
          {tab === "login" && (
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Admin Demo Shortcut */}
              <div style={{ background: "rgba(66,200,183,0.1)", border: "1px dashed rgba(66,200,183,0.3)", borderRadius: 12, padding: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#42c8b7", marginBottom: 2 }}>Admin Access</div>
                  <div style={{ fontSize: 11, color: "#888" }}>Testing the dashboard?</div>
                </div>
                <button type="button" onClick={handleAdminDemo} style={{ background: "#42c8b7", color: "#000", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 200ms" }}>Auto-fill Admin</button>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#aaa", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  style={inputStyle}
                  className="focus-glow"
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#aaa", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={inputStyle}
                />
              </div>
              <button type="submit" disabled={loading} style={submitBtnStyle}>
                {loading ? "Logging in..." : "Login →"}
              </button>
              <p style={{ textAlign: "center", fontSize: 12, color: "#555" }}>
                Don&apos;t have an account?{" "}
                <button type="button" onClick={() => setTab("register")} style={{ background: "none", border: "none", color: "#42c8b7", cursor: "pointer", fontSize: 12 }}>
                  Register here
                </button>
              </p>
            </form>
          )}

          {/* Register Form */}
          {tab === "register" && (
            <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#aaa", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Full Name</label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                  placeholder="John Doe"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#aaa", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Email</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#aaa", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Password</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="Min 6 characters"
                  style={inputStyle}
                />
              </div>
              <button type="submit" disabled={loading} style={submitBtnStyle}>
                {loading ? "Creating account..." : "Create Account →"}
              </button>
              <p style={{ textAlign: "center", fontSize: 12, color: "#555" }}>
                Already have an account?{" "}
                <button type="button" onClick={() => setTab("login")} style={{ background: "none", border: "none", color: "#42c8b7", cursor: "pointer", fontSize: 12 }}>
                  Login here
                </button>
              </p>
            </form>
          )}
        </div>

        {/* Trust indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 24 }}>
          {["🔒 Secure Login", "⚡ Fast Checkout", "📦 Easy Returns"].map((item) => (
            <span key={item} style={{ fontSize: 11, color: "#444" }}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  color: "#ffffff",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  transition: "all 200ms",
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
};

const submitBtnStyle: React.CSSProperties = {
  padding: "14px 0",
  background: "linear-gradient(135deg, #42c8b7 0%, #2ea898 100%)",
  border: "none",
  borderRadius: 12,
  color: "#0a0a0a",
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
  marginTop: 4,
  transition: "opacity 200ms",
  letterSpacing: "0.02em",
};
