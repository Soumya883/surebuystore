"use client";
import { useState } from "react";
import { AdminSidebar, AdminHeader } from "@/components/admin/AdminLayout";
import { Search, MapPin, Calendar, Clock, Check, X } from "lucide-react";

const SELL_REQUESTS = [
  { id: "REQ-001", user: "Arjun Mehta",   device: "Apple iPhone 12", condition: "Flawless", quote: "₹22,000", status: "New",       address: "101, Marine Drive, Mumbai", pickupDate: "17 Aug 2026", pickupTime: "10:00 AM - 01:00 PM" },
  { id: "REQ-002", user: "Pooja Desai",   device: "Samsung S21",     condition: "Good",     quote: "₹18,500", status: "Scheduled", address: "Sector 14, Dwarka, Delhi",  pickupDate: "16 Aug 2026", pickupTime: "02:00 PM - 05:00 PM" },
  { id: "REQ-003", user: "Raaj Patel",    device: "OnePlus 9 Pro",   condition: "Average",  quote: "₹17,000", status: "Inspecting",address: "Vastrapur, Ahmedabad",      pickupDate: "15 Aug 2026", pickupTime: "09:00 AM - 12:00 PM" },
  { id: "REQ-004", user: "Meena Kumari",  device: "Xiaomi 11T",      condition: "Flawless", quote: "₹14,000", status: "New",       address: "Salt Lake, Kolkata",        pickupDate: "18 Aug 2026", pickupTime: "11:00 AM - 02:00 PM" },
  { id: "REQ-005", user: "Rahul Sharma",  device: "iPhone 13",       condition: "Average",  quote: "₹28,000", status: "Completed", address: "Koramangala, Bangalore",    pickupDate: "14 Aug 2026", pickupTime: "04:00 PM - 07:00 PM" },
];

const STATUS_CONFIG: Record<string, { bg: string; color: string }> = {
  New:        { bg: "#dcfce7", color: "#16a34a" },
  Scheduled:  { bg: "#dbeafe", color: "#2563eb" },
  Inspecting: { bg: "#fef9c3", color: "#ca8a04" },
  Completed:  { bg: "#f3f4f6", color: "#6b7280" },
  Cancelled:  { bg: "#fee2e2", color: "#dc2626" },
};

const FILTERS = ["All", "New", "Scheduled", "Inspecting", "Completed", "Cancelled"];

export default function AdminSellRequests() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [requests, setRequests] = useState(SELL_REQUESTS);

  const filtered = requests.filter(r => {
    const matchSearch = r.user.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()) || r.device.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || r.status === filter;
    return matchSearch && matchFilter;
  });

  const updateStatus = (id: string, status: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9", fontFamily: "Inter, system-ui, sans-serif" }}>
      <AdminSidebar active="/admin/sell-requests" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <AdminHeader title="Sell Requests (Pickups)" />
        <main style={{ flex: 1, padding: 24 }}>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
              <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", width: 16, height: 16 }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search ID, user, or device…"
                style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px 10px 38px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, background: "#fff", outline: "none" }} />
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{ padding: "8px 16px", borderRadius: 8, border: "1.5px solid", fontSize: 13, fontWeight: 600, cursor: "pointer",
                    background: filter === f ? "#42c8b7" : "#fff",
                    color: filter === f ? "#fff" : "#64748b",
                    borderColor: filter === f ? "#42c8b7" : "#e2e8f0" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
            {filtered.map(r => (
              <div key={r.id} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: "#f8fafc" }}>
                  <div>
                    <div style={{ fontSize: 12, color: "#64748b", fontWeight: 700, marginBottom: 4 }}>{r.id}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{r.device}</div>
                    <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>Cond: <span style={{ color: "#0f172a", fontWeight: 600 }}>{r.condition}</span></div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#42c8b7" }}>{r.quote}</div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, display: "inline-block", marginTop: 6, background: STATUS_CONFIG[r.status].bg, color: STATUS_CONFIG[r.status].color }}>{r.status}</span>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: "16px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Customer</div>
                    <div style={{ fontSize: 13, color: "#0f172a", fontWeight: 600 }}>{r.user}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Pickup Details</div>
                    <div style={{ fontSize: 13, color: "#0f172a", display: "flex", gap: 6, marginBottom: 4 }}><MapPin size={14} style={{ color: "#64748b", marginTop: 2, flexShrink: 0 }} /> {r.address}</div>
                    <div style={{ fontSize: 13, color: "#0f172a", display: "flex", gap: 6, marginBottom: 4 }}><Calendar size={14} style={{ color: "#64748b" }} /> {r.pickupDate}</div>
                    <div style={{ fontSize: 13, color: "#0f172a", display: "flex", gap: 6 }}><Clock size={14} style={{ color: "#64748b" }} /> {r.pickupTime}</div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ padding: "12px 20px", borderTop: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  {r.status === "New" && (
                    <>
                      <button onClick={() => updateStatus(r.id, "Cancelled")} style={{ flex: 1, padding: "8px 0", border: "none", borderRadius: 6, background: "#fef2f2", color: "#ef4444", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Reject</button>
                      <button onClick={() => updateStatus(r.id, "Scheduled")} style={{ flex: 1, padding: "8px 0", border: "none", borderRadius: 6, background: "#dbeafe", color: "#2563eb", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Schedule Agent</button>
                    </>
                  )}
                  {r.status === "Scheduled" && (
                    <button onClick={() => updateStatus(r.id, "Inspecting")} style={{ flex: 1, padding: "8px 0", border: "none", borderRadius: 6, background: "#fef9c3", color: "#ca8a04", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Agent Arrived (Inspect)</button>
                  )}
                  {r.status === "Inspecting" && (
                    <button onClick={() => updateStatus(r.id, "Completed")} style={{ flex: 1, padding: "8px 0", border: "none", borderRadius: 6, background: "#dcfce7", color: "#16a34a", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Check size={16}/> Complete Payment</button>
                  )}
                  {(r.status === "Completed" || r.status === "Cancelled") && (
                    <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600, padding: "8px 0", textAlign: "center", width: "100%" }}>{r.status === "Completed" ? "Device Collected & Paid" : "Request Cancelled"}</span>
                  )}
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 48, color: "#94a3b8" }}>No requests found.</div>}
          </div>
        </main>
      </div>
    </div>
  );
}
