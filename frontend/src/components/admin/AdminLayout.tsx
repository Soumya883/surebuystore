"use client";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard, Package, ShoppingBag, Users, Recycle,
  TrendingUp, TrendingDown, IndianRupee, Bell, Settings,
  LogOut, Menu, X, ChevronRight
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard",     href: "/admin",               icon: LayoutDashboard },
  { label: "Products",      href: "/admin/products",      icon: Package },
  { label: "Orders",        href: "/admin/orders",        icon: ShoppingBag },
  { label: "Users",         href: "/admin/users",         icon: Users },
  { label: "Sell Requests", href: "/admin/sell-requests", icon: Recycle },
  { label: "Settings",      href: "/admin/settings",      icon: Settings },
];

export function AdminSidebar({ active }: { active: string }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`admin-sidebar ${collapsed ? "" : "open"}`} style={{
      width: collapsed ? 64 : 240,
      background: "#0f172a",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      transition: "width 250ms ease",
      flexShrink: 0,
      position: "sticky",
      top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #1e293b" }}>
        {!collapsed && (
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, background: "#42c8b7", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 14 }}>S</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>Sure<span style={{ color: "#42c8b7" }}>Buy</span></span>
          </Link>
        )}
        <button onClick={() => setCollapsed(!collapsed)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 4, borderRadius: 6, minHeight: 32, minWidth: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = active === href;
          return (
            <Link key={href} href={href} style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: collapsed ? "10px" : "10px 12px",
                borderRadius: 8,
                background: isActive ? "#42c8b7" : "transparent",
                color: isActive ? "#fff" : "#94a3b8",
                fontSize: 14, fontWeight: isActive ? 600 : 400,
                transition: "all 150ms",
                justifyContent: collapsed ? "center" : "flex-start",
                cursor: "pointer",
              }}
                onMouseOver={e => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "#1e293b"; }}
                onMouseOut={e => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                {!collapsed && <span>{label}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "12px 8px", borderTop: "1px solid #1e293b" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, color: "#ef4444", fontSize: 14, cursor: "pointer", justifyContent: collapsed ? "center" : "flex-start" }}>
            <LogOut size={18} />
            {!collapsed && <span>Exit Admin</span>}
          </div>
        </Link>
      </div>
    </aside>
  );
}

export function AdminHeader({ title }: { title: string }) {
  return (
    <header style={{ height: 64, background: "#fff", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0, zIndex: 30 }}>
      <h1 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", margin: 0 }}>{title}</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button style={{ position: "relative", background: "#f1f5f9", border: "none", borderRadius: 8, padding: 8, cursor: "pointer", minHeight: 36, minWidth: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Bell size={18} style={{ color: "#64748b" }} />
          <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, background: "#ef4444", borderRadius: "50%" }} />
        </button>
        <div style={{ width: 36, height: 36, background: "#42c8b7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 14 }}>A</div>
      </div>
    </header>
  );
}

interface StatCardProps { label: string; value: string; change: string; up: boolean; icon: React.ElementType; color: string; }
export function StatCard({ label, value, change, up, icon: Icon, color }: StatCardProps) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "20px 24px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 26, fontWeight: 800, color: "#0f172a" }}>{value}</div>
        <div style={{ fontSize: 12, color: up ? "#22c55e" : "#ef4444", display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
          {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change} vs last month
        </div>
      </div>
      <div style={{ width: 52, height: 52, borderRadius: 12, background: color, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={24} style={{ color: "#fff" }} />
      </div>
    </div>
  );
}
