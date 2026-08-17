"use client";
import { useState } from "react";
import { AdminSidebar, AdminHeader } from "@/components/admin/AdminLayout";
import { Search, MapPin, Mail, Phone } from "lucide-react";

const USERS = [
  { id: "U-891", name: "Arjun Mehta",   email: "arjun.m@example.com", phone: "+91 98765 43210", city: "Mumbai",    joined: "12 Aug 2026", orders: 4, status: "Active" },
  { id: "U-890", name: "Pooja Desai",   email: "pooja.d@example.com", phone: "+91 91234 56789", city: "Delhi",     joined: "10 Aug 2026", orders: 1, status: "Active" },
  { id: "U-889", name: "Raaj Patel",    email: "raaj.p@example.com",  phone: "+91 99887 76655", city: "Ahmedabad", joined: "05 Aug 2026", orders: 8, status: "Active" },
  { id: "U-888", name: "Sneha Verma",   email: "sneha.v@example.com", phone: "+91 98765 12345", city: "Bangalore", joined: "02 Aug 2026", orders: 2, status: "Blocked" },
  { id: "U-887", name: "Vikram Nair",   email: "vikram.n@example.com",phone: "+91 90000 11111", city: "Chennai",   joined: "28 Jul 2026", orders: 5, status: "Active" },
];

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(USERS);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search)
  );

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" } : u));
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9", fontFamily: "Inter, system-ui, sans-serif" }}>
      <AdminSidebar active="/admin/users" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <AdminHeader title="Users" />
        <main style={{ flex: 1, padding: 24 }}>

          <div style={{ position: "relative", maxWidth: 400, marginBottom: 20 }}>
            <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", width: 16, height: 16 }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email or phone…"
              style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px 10px 38px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, background: "#fff", outline: "none" }} />
          </div>

          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["User", "Contact Info", "Location", "Orders", "Joined", "Status", "Actions"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr key={u.id} style={{ borderTop: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafcff" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 36, height: 36, background: "#e8f9f7", color: "#42c8b7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{u.name}</div>
                          <div style={{ fontSize: 11, color: "#94a3b8" }}>{u.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ fontSize: 13, color: "#0f172a", display: "flex", alignItems: "center", gap: 6 }}><Mail size={12} style={{ color: "#94a3b8" }}/> {u.email}</div>
                      <div style={{ fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}><Phone size={12} style={{ color: "#94a3b8" }}/> {u.phone}</div>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#64748b" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={14} style={{ color: "#94a3b8" }} /> {u.city}</div>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{u.orders}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#64748b" }}>{u.joined}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 9999, background: u.status === "Active" ? "#dcfce7" : "#fee2e2", color: u.status === "Active" ? "#16a34a" : "#dc2626" }}>{u.status}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <button onClick={() => toggleStatus(u.id)}
                        style={{ background: u.status === "Active" ? "#fef2f2" : "#ecfdf5", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer", color: u.status === "Active" ? "#ef4444" : "#10b981", fontSize: 12, fontWeight: 600 }}>
                        {u.status === "Active" ? "Block" : "Unblock"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div style={{ textAlign: "center", padding: 48, color: "#94a3b8" }}>No users found.</div>}
          </div>
        </main>
      </div>
    </div>
  );
}
