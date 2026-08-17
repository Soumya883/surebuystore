"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CartItem { id: string; title: string; price: number; mrp: number; images: string[]; quantity: number; }

const INDIAN_STATES = ["Andhra Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [step, setStep] = useState<1|2|3>(1);
  const [paymentMethod, setPaymentMethod] = useState<"COD"|"RAZORPAY">("COD");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const [address, setAddress] = useState({ fullName: "", phone: "", address: "", city: "", state: "Odisha", pincode: "" });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setItems(JSON.parse(stored));
    const u = localStorage.getItem("user");
    if (!u) { router.push("/auth"); return; }
    setUser(JSON.parse(u));
  }, [router]);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const savings = items.reduce((s, i) => s + ((i.mrp || i.price) - i.price) * i.quantity, 0);
  const advancePay = Math.round(total * 0.1);
  const codRemaining = total - advancePay;

  const handleAddressSubmit = (e: React.FormEvent) => { e.preventDefault(); setStep(2); };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const submitOrderToBackend = async (razorpayPaymentId?: string, razorpayOrderId?: string) => {
    const token = localStorage.getItem("access_token");
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        items: items.map(i => ({ productId: i.id, quantity: i.quantity })),
        paymentMethod,
        shippingAddress: address,
        advanceAmount: paymentMethod === "COD" ? advancePay : total,
        remainingAmount: paymentMethod === "COD" ? codRemaining : 0,
        razorpayPaymentId,
        razorpayOrderId,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Order failed");
    setOrderId(data.id);
    localStorage.removeItem("cart");
    setStep(3);
  };

  const placeOrder = async () => {
    setLoading(true); setError("");
    try {
      const payableAmount = paymentMethod === "COD" ? advancePay : total;
      const sdkLoaded = await loadRazorpayScript();

      if (!sdkLoaded) {
        // Fallback to direct backend submit if SDK fails to load
        await submitOrderToBackend();
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "rzp_test_SureBuyStore",
        amount: payableAmount * 100, // Amount in paise
        currency: "INR",
        name: "SureBuy Store",
        description: paymentMethod === "COD" ? `10% COD Deposit (₹${advancePay})` : "Full Prepaid Order",
        image: "/logo.png",
        handler: async function (response: any) {
          try {
            await submitOrderToBackend(response.razorpay_payment_id, response.razorpay_order_id);
          } catch (err: any) {
            setError(err.message || "Payment verification failed");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: address.fullName,
          email: user?.email || "",
          contact: address.phone,
        },
        theme: {
          color: "#42c8b7",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err: any) { 
      setError(err.message); 
      setLoading(false);
    }
  };

  if (items.length === 0 && step !== 3) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 64 }}>🛒</div>
        <h2 style={{ marginTop: 16 }}>Your cart is empty</h2>
        <Link href="/products" style={{ display: "inline-block", marginTop: 16, background: "#42c8b7", color: "#fff", padding: "12px 28px", borderRadius: 8, textDecoration: "none" }}>Browse Products</Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/"><div style={{ position: "relative", width: 130, height: 38 }}><Image src="/logo.png" alt="SureBuy" fill style={{ objectFit: "contain", objectPosition: "left" }} /></div></Link>
        <div style={{ display: "flex", gap: 8 }}>
          {[{n:1,l:"Address"},{n:2,l:"Payment"},{n:3,l:"Confirmation"}].map(({n,l})=>(
            <div key={n} style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", background: step >= n ? "#42c8b7" : "#eee", color: step >= n ? "#fff" : "#999", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:13 }}>{step > n ? "✓" : n}</div>
              <span style={{ fontSize:13, color: step >= n ? "#333" : "#aaa", fontWeight: step === n ? 700 : 400 }}>{l}</span>
              {n < 3 && <span style={{ color:"#ddd", fontSize:18, margin:"0 4px" }}>›</span>}
            </div>
          ))}
        </div>
        <span style={{ fontSize:13, color:"#555" }}>Secure Checkout 🔒</span>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
        {/* Left: Steps */}
        <div>
          {/* Step 1 – Address */}
          {step === 1 && (
            <div style={{ background: "#fff", borderRadius: 12, padding: "28px" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#222" }}>📍 Delivery Address</h2>
              <form onSubmit={handleAddressSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { key: "fullName", label: "Full Name", placeholder: "John Doe", full: true },
                  { key: "phone", label: "Phone Number", placeholder: "10-digit mobile number", full: true },
                  { key: "address", label: "House / Flat / Street", placeholder: "123, MG Road, Near...", full: true },
                  { key: "city", label: "City", placeholder: "Bhubaneswar" },
                  { key: "pincode", label: "Pincode", placeholder: "751001" },
                ].map(({ key, label, placeholder, full }) => (
                  <div key={key} style={{ gridColumn: full ? "1 / -1" : "auto" }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 6, textTransform: "uppercase" }}>{label}</label>
                    <input required value={(address as any)[key]} onChange={e => setAddress(a => ({ ...a, [key]: e.target.value }))} placeholder={placeholder}
                      style={{ width: "100%", padding: "11px 14px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14, boxSizing: "border-box", outline: "none" }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 6, textTransform: "uppercase" }}>State</label>
                  <select value={address.state} onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}
                    style={{ width: "100%", padding: "11px 14px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14, outline: "none" }}>
                    {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <button type="submit" style={{ width:"100%", padding:"14px", background:"#42c8b7", border:"none", borderRadius:10, color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer" }}>
                    Continue to Payment →
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2 – Payment */}
          {step === 2 && (
            <div style={{ background: "#fff", borderRadius: 12, padding: "28px" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#222" }}>💳 Choose Payment Method</h2>

              {error && <div style={{ background: "#fff5f5", border: "1px solid #fed7d7", borderRadius: 8, padding: "12px 16px", color: "#e53e3e", marginBottom: 16, fontSize: 14 }}>{error}</div>}

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
                {/* COD Option */}
                <label style={{ display: "flex", gap: 14, padding: "18px 20px", border: `2px solid ${paymentMethod === "COD" ? "#42c8b7" : "#eee"}`, borderRadius: 12, cursor: "pointer", transition: "border-color 200ms" }}>
                  <input type="radio" name="payment" value="COD" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} style={{ marginTop: 3 }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#333", marginBottom: 4 }}>💵 Partial COD (10% Pay Now + 90% on Delivery)</div>
                    <div style={{ fontSize: 13, color: "#555" }}>Pay <strong style={{ color:"#42c8b7" }}>10% (₹{advancePay.toLocaleString()})</strong> now to confirm order. Pay remaining <strong style={{ color:"#2e7d32" }}>90% (₹{codRemaining.toLocaleString()})</strong> on delivery.</div>
                    <div style={{ marginTop: 8, display:"flex", flexWrap:"wrap", gap:8 }}>
                      {[`⚡ ₹${advancePay.toLocaleString()} Pay Now`,`🚚 ₹${codRemaining.toLocaleString()} On Delivery`,`🔒 100% Safe`].map(t => (
                        <span key={t} style={{ fontSize:11, background:"#e8f9f7", color:"#2ea898", padding:"3px 8px", borderRadius:4, fontWeight:600 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </label>

                {/* Prepaid Option */}
                <label style={{ display: "flex", gap: 14, padding: "18px 20px", border: `2px solid ${paymentMethod === "RAZORPAY" ? "#42c8b7" : "#eee"}`, borderRadius: 12, cursor: "pointer", transition: "border-color 200ms" }}>
                  <input type="radio" name="payment" value="RAZORPAY" checked={paymentMethod === "RAZORPAY"} onChange={() => setPaymentMethod("RAZORPAY")} style={{ marginTop: 3 }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#333", marginBottom: 4 }}>⚡ Full Prepaid Online Payment</div>
                    <div style={{ fontSize: 13, color: "#555" }}>UPI, Debit/Credit Cards, Net Banking via Razorpay. Pay 100% (₹{total.toLocaleString()}) now.</div>
                    <div style={{ marginTop: 8, display:"flex", gap:8 }}>
                      {["🔒 SSL Secured","⚡ Instant Confirmation","🎁 Priority Dispatch"].map(t => (
                        <span key={t} style={{ fontSize:11, background:"#e8f0fe", color:"#3730a3", padding:"3px 8px", borderRadius:4, fontWeight:600 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </label>
              </div>

              {/* Address Summary */}
              <div style={{ background:"#f8f9fa", borderRadius:10, padding:"14px 16px", marginBottom:20, fontSize:13, color:"#444" }}>
                <div style={{ fontWeight:700, marginBottom:4 }}>📍 Delivering to:</div>
                <div>{address.fullName}, {address.phone}</div>
                <div>{address.address}, {address.city}, {address.state} - {address.pincode}</div>
              </div>

              <div style={{ display:"flex", gap:12 }}>
                <button onClick={() => setStep(1)} style={{ flex:1, padding:"13px", background:"#f0f0f0", border:"none", borderRadius:10, color:"#333", fontSize:14, fontWeight:600, cursor:"pointer" }}>← Back</button>
                <button onClick={placeOrder} disabled={loading} style={{ flex:2, padding:"13px", background:"linear-gradient(135deg, #ff6b35, #ee5a24)", border:"none", borderRadius:10, color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer" }}>
                  {loading ? "Processing..." : paymentMethod === "COD" ? `Pay 10% (₹${advancePay.toLocaleString()}) & Confirm COD →` : "Proceed to Pay →"}
                </button>
              </div>
            </div>
          )}

          {/* Step 3 – Success */}
          {step === 3 && (
            <div style={{ background:"#fff", borderRadius:12, padding:"48px 32px", textAlign:"center" }}>
              <div style={{ width:80, height:80, background:"linear-gradient(135deg,#42c8b7,#2ea898)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:36 }}>✓</div>
              <h2 style={{ fontSize:24, fontWeight:700, color:"#222", marginBottom:8 }}>Order Placed Successfully!</h2>
              <p style={{ color:"#666", marginBottom:4, fontSize:15 }}>Order ID: <strong style={{ color:"#42c8b7" }}>#{orderId.slice(-8).toUpperCase()}</strong></p>
              {paymentMethod === "COD" && (
                <div style={{ background:"#e8f9f7", border:"1px solid #42c8b7", borderRadius:10, padding:"18px", margin:"20px 0", fontSize:14, textAlign:"left" }}>
                  <div style={{ fontWeight:700, color:"#165042", marginBottom:6, fontSize:15 }}>💵 COD Order Confirmed Breakdown</div>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span>10% Advance Deposit (Paid Now):</span>
                    <strong style={{ color:"#165042" }}>₹{advancePay.toLocaleString()}</strong>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", marginTop:4, borderTop:"1px solid #c8f2ed", paddingTop:6 }}>
                    <span>90% Balance Due on Delivery:</span>
                    <strong style={{ color:"#2e7d32", fontSize:16 }}>₹{codRemaining.toLocaleString()}</strong>
                  </div>
                </div>
              )}
              <p style={{ color:"#888", fontSize:13, marginBottom:24 }}>We&apos;ll send order updates to {user?.email}</p>
              <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
                <Link href="/" style={{ padding:"12px 24px", background:"#42c8b7", color:"#fff", borderRadius:8, textDecoration:"none", fontWeight:600 }}>Continue Shopping</Link>
                <Link href="/account/orders" style={{ padding:"12px 24px", background:"#f0f0f0", color:"#333", borderRadius:8, textDecoration:"none", fontWeight:600 }}>View My Orders</Link>
              </div>
            </div>
          )}
        </div>

        {/* Right: Summary */}
        {step !== 3 && (
          <div style={{ position:"sticky", top:80 }}>
            <div style={{ background:"#fff", borderRadius:12, padding:"20px" }}>
              <h3 style={{ fontSize:14, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:16 }}>Order Summary</h3>
              {items.map(item => (
                <div key={item.id} style={{ display:"flex", gap:10, alignItems:"center", marginBottom:14 }}>
                  <div style={{ position:"relative", width:50, height:50, borderRadius:6, overflow:"hidden", flexShrink:0 }}>
                    <Image src={item.images?.[0] || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200"} alt={item.title} fill style={{ objectFit:"cover" }} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:"#333" }}>{item.title}</div>
                    <div style={{ fontSize:12, color:"#888" }}>Qty: {item.quantity}</div>
                  </div>
                  <span style={{ fontWeight:700, fontSize:14 }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ borderTop:"1px solid #f0f0f0", paddingTop:14, display:"flex", justifyContent:"space-between", fontWeight:700, fontSize:16 }}>
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              {paymentMethod === "COD" && (
                <div style={{ marginTop:14, background:"#f8f9fa", borderRadius:8, padding:"12px", border:"1px solid #e2e8f0" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:4, color:"#42c8b7", fontWeight:700 }}>
                    <span>10% Pay Now (Deposit):</span>
                    <span>₹{advancePay.toLocaleString()}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#2e7d32", fontWeight:700 }}>
                    <span>90% Pay on Delivery:</span>
                    <span>₹{codRemaining.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
