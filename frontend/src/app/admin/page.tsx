"use client";
import { AdminSidebar, AdminHeader, StatCard } from "@/components/admin/AdminLayout";
import { Package, ShoppingBag, Users, Recycle, IndianRupee, TrendingUp } from "lucide-react";

const RECENT_ORDERS = [
  { id: "#ORD-1091", customer: "Rohit Sharma", device: "iPhone 14 Pro", amount: "₹48,000", status: "Completed", date: "16 Aug 2026" },
  { id: "#ORD-1090", customer: "Priya Kapoor",  device: "Samsung S23",  amount: "₹34,500", status: "Pending",   date: "16 Aug 2026" },
  { id: "#ORD-1089", customer: "Aditya Singh",  device: "OnePlus 11",   amount: "₹24,000", status: "Pickup",    date: "15 Aug 2026" },
  { id: "#ORD-1088", customer: "Sneha Verma",   device: "iPhone 13",    amount: "₹32,000", status: "Completed", date: "15 Aug 2026" },
  { id: "#ORD-1087", customer: "Vikram Nair",   device: "Xiaomi 13 Pro",amount: "₹26,000", status: "Cancelled", date: "14 Aug 2026" },
];

const STATUS_COLOR: Record<string, { bg: string; color: string }> = {
  Completed: { bg: "#dcfce7", color: "#16a34a" },
  Pending:   { bg: "#fef9c3", color: "#ca8a04" },
  Pickup:    { bg: "#dbeafe", color: "#2563eb" },
  Cancelled: { bg: "#fee2e2", color: "#dc2626" },
};

const SELL_REQUESTS = [
  { user: "Arjun Mehta",   device: "iPhone 12 (128GB)", quote: "₹22,000", status: "New" },
  { user: "Pooja Desai",   device: "Samsung S21",       quote: "₹18,500", status: "Scheduled" },
  { user: "Raaj Patel",    device: "OnePlus 9 Pro",     quote: "₹17,000", status: "Inspecting" },
  { user: "Meena Kumari",  device: "Xiaomi 11T",        quote: "₹14,000", status: "New" },
];

const BAR_DATA = [
  { month: "Mar", val: 58 }, { month: "Apr", val: 72 },
  { month: "May", val: 65 }, { month: "Jun", val: 89 },
  { month: "Jul", val: 78 }, { month: "Aug", val: 95 },
];

export default function AdminDashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9", fontFamily: "Inter, system-ui, sans-serif" }}>
      <AdminSidebar active="/admin" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <AdminHeader title="Dashboard" />
        <main style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            <StatCard label="Total Revenue"     value="₹12.4L"  change="+18.2%"  up icon={IndianRupee}  color="#42c8b7" />
            <StatCard label="Total Orders"      value="1,284"   change="+12.1%"  up icon={ShoppingBag} color="#6366f1" />
            <StatCard label="Sell Requests"     value="348"     change="+24.5%"  up icon={Recycle}     color="#f59e0b" />
            <StatCard label="Active Users"      value="5,620"   change="+8.3%"   up icon={Users}       color="#ec4899" />
          </div>

          <div className="resp-grid-1" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
            {/* Revenue Chart */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: "#0f172a" }}>Monthly Revenue</h2>
                <span style={{ fontSize: 12, color: "#64748b", background: "#f1f5f9", padding: "4px 12px", borderRadius: 9999 }}>Last 6 months</span>
              </div>
              {/* Bar chart (CSS-only) */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160 }}>
                {BAR_DATA.map(d => (
                  <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#42c8b7" }}>
                      {d.val === 95 ? "₹12.4L" : ""}
                    </div>
                    <div style={{ width: "100%", height: `${d.val * 1.6}px`, background: d.val === 95 ? "#42c8b7" : "#e8f9f7", borderRadius: "6px 6px 0 0", transition: "all 300ms", minHeight: 8 }} />
                    <div style={{ fontSize: 11, color: "#64748b" }}>{d.month}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats donut-style */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: "#0f172a" }}>Order Status</h2>
              {[
                { label: "Completed", count: 842, pct: 66, color: "#42c8b7" },
                { label: "Pending",   count: 284, pct: 22, color: "#f59e0b" },
                { label: "Cancelled", count: 158, pct: 12, color: "#ef4444" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                    <span style={{ color: "#0f172a", fontWeight: 500 }}>{s.label}</span>
                    <span style={{ color: "#64748b" }}>{s.count}</span>
                  </div>
                  <div style={{ height: 8, background: "#f1f5f9", borderRadius: 9999, overflow: "hidden" }}>
                    <div style={{ width: `${s.pct}%`, height: "100%", background: s.color, borderRadius: 9999, transition: "width 600ms ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="resp-grid-1" style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20 }}>
            {/* Recent Orders */}
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: "#0f172a" }}>Recent Orders</h2>
                <a href="/admin/orders" style={{ fontSize: 12, color: "#42c8b7", textDecoration: "none", fontWeight: 600 }}>View All →</a>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {["Order ID", "Customer", "Device", "Amount", "Status", "Date"].map(h => (
                      <th key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ORDERS.map((o, i) => (
                    <tr key={o.id} style={{ borderTop: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafcff" }}>
                      <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#42c8b7" }}>{o.id}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#0f172a" }}>{o.customer}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#64748b" }}>{o.device}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{o.amount}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 9999, background: STATUS_COLOR[o.status].bg, color: STATUS_COLOR[o.status].color }}>
                          {o.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#94a3b8" }}>{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Live Sell Requests */}
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: "#0f172a" }}>Live Sell Requests</h2>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 0 3px rgba(34,197,94,0.3)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {SELL_REQUESTS.map((r, i) => (
                  <div key={r.user} style={{ padding: "14px 20px", borderTop: i > 0 ? "1px solid #f1f5f9" : "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{r.user}</div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{r.device}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#42c8b7" }}>{r.quote}</div>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 9999,
                        background: r.status === "New" ? "#dcfce7" : r.status === "Scheduled" ? "#dbeafe" : "#fef9c3",
                        color: r.status === "New" ? "#16a34a" : r.status === "Scheduled" ? "#2563eb" : "#ca8a04"
                      }}>
                        {r.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "12px 20px", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
                <a href="/admin/sell-requests" style={{ fontSize: 13, color: "#42c8b7", textDecoration: "none", fontWeight: 600 }}>Manage All Requests →</a>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
