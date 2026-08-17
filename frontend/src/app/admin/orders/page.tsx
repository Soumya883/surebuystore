"use client";
import { useState } from "react";
import { AdminSidebar, AdminHeader } from "@/components/admin/AdminLayout";
import { Search, Eye, Check, X } from "lucide-react";

const ORDERS = [
  { id: "#ORD-1091", customer: "Rohit Sharma",  device: "iPhone 14 Pro",    amount: "₹48,000", status: "Completed", date: "16 Aug 2026", city: "Mumbai" },
  { id: "#ORD-1090", customer: "Priya Kapoor",   device: "Samsung S23",      amount: "₹34,500", status: "Pending",   date: "16 Aug 2026", city: "Delhi" },
  { id: "#ORD-1089", customer: "Aditya Singh",   device: "OnePlus 11",       amount: "₹24,000", status: "Pickup",    date: "15 Aug 2026", city: "Bangalore" },
  { id: "#ORD-1088", customer: "Sneha Verma",    device: "iPhone 13",        amount: "₹32,000", status: "Completed", date: "15 Aug 2026", city: "Chennai" },
  { id: "#ORD-1087", customer: "Vikram Nair",    device: "Xiaomi 13 Pro",    amount: "₹26,000", status: "Cancelled", date: "14 Aug 2026", city: "Hyderabad" },
  { id: "#ORD-1086", customer: "Anjali Rao",     device: "Samsung S22",      amount: "₹28,000", status: "Completed", date: "14 Aug 2026", city: "Pune" },
  { id: "#ORD-1085", customer: "Kiran Kumar",    device: "OnePlus 9 Pro",    amount: "₹18,500", status: "Pending",   date: "13 Aug 2026", city: "Kolkata" },
  { id: "#ORD-1084", customer: "Deepika Menon",  device: "iPhone 12",        amount: "₹22,000", status: "Completed", date: "13 Aug 2026", city: "Ahmedabad" },
];

const STATUS_CONFIG: Record<string, { bg: string; color: string }> = {
  Completed: { bg: "#dcfce7", color: "#16a34a" },
  Pending:   { bg: "#fef9c3", color: "#ca8a04" },
  Pickup:    { bg: "#dbeafe", color: "#2563eb" },
  Cancelled: { bg: "#fee2e2", color: "#dc2626" },
};

const FILTERS = ["All", "Completed", "Pending", "Pickup", "Cancelled"];

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [orders, setOrders] = useState(ORDERS);

  const filtered = orders.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || o.status === filter;
    return matchSearch && matchFilter;
  });

  const updateStatus = (id: string, status: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9", fontFamily: "Inter, system-ui, sans-serif" }}>
      <AdminSidebar active="/admin/orders" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <AdminHeader title="Orders" />
        <main style={{ flex: 1, padding: 24 }}>

          {/* Filters */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
              <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", width: 16, height: 16 }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order ID or customer…"
                style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px 10px 38px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, background: "#fff", outline: "none" }} />
            </div>
            <div style={{ display: "flex", gap: 6 }}>
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

          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Order ID", "Customer", "City", "Device", "Amount", "Status", "Date", "Actions"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => (
                  <tr key={o.id} style={{ borderTop: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafcff" }}>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#42c8b7" }}>{o.id}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 500, color: "#0f172a" }}>{o.customer}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#64748b" }}>{o.city}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#64748b" }}>{o.device}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{o.amount}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 9999, background: STATUS_CONFIG[o.status].bg, color: STATUS_CONFIG[o.status].color }}>{o.status}</span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 12, color: "#94a3b8" }}>{o.date}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 4 }}>
                        {o.status === "Pending" && (
                          <>
                            <button onClick={() => updateStatus(o.id, "Pickup")}
                              style={{ background: "#dbeafe", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: "#2563eb", fontSize: 12, fontWeight: 600 }}>
                              Accept
                            </button>
                            <button onClick={() => updateStatus(o.id, "Cancelled")}
                              style={{ background: "#fef2f2", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: "#ef4444", fontSize: 12, fontWeight: 600 }}>
                              Cancel
                            </button>
                          </>
                        )}
                        {o.status === "Pickup" && (
                          <button onClick={() => updateStatus(o.id, "Completed")}
                            style={{ background: "#dcfce7", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: "#16a34a", fontSize: 12, fontWeight: 600 }}>
                            Complete
                          </button>
                        )}
                        {(o.status === "Completed" || o.status === "Cancelled") && (
                          <span style={{ fontSize: 12, color: "#94a3b8" }}>—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div style={{ textAlign: "center", padding: 48, color: "#94a3b8" }}>No orders found.</div>}
          </div>
        </main>
      </div>
    </div>
  );
}
