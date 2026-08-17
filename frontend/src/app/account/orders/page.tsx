"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PackageX, Package, Search, ChevronRight, ShoppingBag } from "lucide-react";

const STATUS_COLORS: Record<string, { bg: string; text: string; icon: string; label: string }> = {
  PENDING_COD:         { bg: "bg-amber-100", text: "text-amber-700", icon: "⏳", label: "Pending COD" },
  CONFIRMED_COD:       { bg: "bg-green-100", text: "text-green-700", icon: "✅", label: "COD Confirmed" },
  PAYMENT_PENDING:     { bg: "bg-amber-100", text: "text-amber-700", icon: "💳", label: "Payment Pending" },
  PAYMENT_DONE:        { bg: "bg-emerald-100", text: "text-emerald-700", icon: "✅", label: "Paid" },
  PROCESSING:          { bg: "bg-sky-100", text: "text-sky-700", icon: "🔧", label: "Processing" },
  SHIPPED:             { bg: "bg-violet-100", text: "text-violet-700", icon: "🚚", label: "Shipped" },
  DELIVERED:           { bg: "bg-emerald-100", text: "text-emerald-700", icon: "📦", label: "Delivered" },
  CANCELLED:           { bg: "bg-red-100", text: "text-red-700", icon: "❌", label: "Cancelled" },
  RETURN_REQUESTED:    { bg: "bg-orange-100", text: "text-orange-700", icon: "↩", label: "Return Requested" },
  RETURNED:            { bg: "bg-gray-100", text: "text-gray-600", icon: "↩", label: "Returned" },
};

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) { router.push("/auth"); return; }

    fetch("http://localhost:3001/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => { setOrders(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setError("Failed to load orders"); setLoading(false); });
  }, [router]);

  const cancelOrder = async (id: string) => {
    const token = localStorage.getItem("access_token");
    const res = await fetch(`http://localhost:3001/orders/${id}/cancel`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: "CANCELLED" } : o));
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.items?.some((i: any) => i.product?.title?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Premium Header */}
      <div className="bg-white border-b border-border/40 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">My Orders</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Track and manage your purchases</p>
            </div>
          </div>
          
          <div className="relative max-w-xs w-full hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-100/50 border-transparent rounded-full text-sm focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        {/* Mobile Search */}
        <div className="relative w-full mb-6 md:hidden">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-3 bg-white border border-border rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none shadow-sm"
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl flex items-center gap-3 mb-6">
            <PackageX size={20} />
            <p className="font-medium text-sm">{error}</p>
          </div>
        )}

        {!loading && orders.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-border rounded-2xl p-12 text-center shadow-sm flex flex-col items-center max-w-md mx-auto mt-10"
          >
            <div className="h-24 w-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
              <Package size={48} className="text-primary/40" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">No orders found</h2>
            <p className="text-muted-foreground mb-8 text-sm">Looks like you haven't made your first purchase yet. Discover great deals in our store.</p>
            <Link href="/products" className="cashify-btn-primary w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98] transition-transform">
              Start Shopping
            </Link>
          </motion.div>
        )}

        <div className="space-y-6">
          {!loading && orders.length > 0 && filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No orders match your search "{searchQuery}"</p>
              <button onClick={() => setSearchQuery("")} className="text-primary font-medium mt-2 text-sm hover:underline">Clear search</button>
            </div>
          )}

          {filteredOrders.map((order, idx) => {
            const statusInfo = STATUS_COLORS[order.status] || { bg: "bg-gray-100", text: "text-gray-700", icon: "•", label: order.status };
            const cancellable = ["PENDING_COD", "PAYMENT_PENDING"].includes(order.status);
            
            return (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={order.id} 
                className="bg-white rounded-2xl overflow-hidden border border-border/60 shadow-sm hover:shadow-md transition-shadow group"
              >
                {/* Order Header */}
                <div className="p-5 sm:px-6 sm:py-4 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Order ID</span>
                      <span className="text-sm font-mono font-bold text-foreground">#{order.id?.slice(-8).toUpperCase()}</span>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      📅 {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  
                  <div className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 w-max ${statusInfo.bg} ${statusInfo.text}`}>
                    <span>{statusInfo.icon}</span>
                    <span>{statusInfo.label}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-5 sm:p-6 space-y-4">
                  {order.items?.map((item: any) => (
                    <div key={item.id} className="flex gap-4 sm:gap-5 items-start group/item">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 border border-border/50 p-2">
                        <Image
                          src={item.product?.images?.[0] || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200"}
                          alt={item.product?.title || "Product"}
                          fill
                          className="object-contain p-1 transition-transform group-hover/item:scale-110"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.product?.id}`} className="hover:text-primary transition-colors">
                          <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-2 mb-1">
                            {item.product?.title}
                          </h3>
                        </Link>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                          <span className="text-xs sm:text-sm font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">Qty: {item.quantity}</span>
                          <span className="text-xs sm:text-sm text-muted-foreground">× ₹{Number(item.priceAtPurchase).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="font-bold text-sm sm:text-base text-foreground text-right whitespace-nowrap">
                        ₹{(item.quantity * Number(item.priceAtPurchase)).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="p-5 sm:px-6 sm:py-4 bg-gray-50 border-t border-border/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-white border border-border flex items-center justify-center text-muted-foreground shadow-sm">
                      {order.paymentMethod === "COD" ? "💵" : "💳"}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Payment Method</p>
                      <p className="text-sm font-medium text-foreground flex items-center gap-2">
                        {order.paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
                        {order.paymentMethod === "COD" && order.status !== "DELIVERED" && (
                          <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wider">Unpaid</span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 pt-4 sm:pt-0 border-t sm:border-0 border-border/40">
                    <div className="flex flex-col items-start sm:items-end">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order Total</span>
                      <span className="font-bold text-lg sm:text-xl text-primary">₹{Number(order.totalAmount).toLocaleString()}</span>
                    </div>
                    
                    {cancellable ? (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="text-xs font-semibold px-4 py-2 bg-white border border-destructive text-destructive rounded-lg hover:bg-destructive/5 transition-colors active:scale-95"
                      >
                        Cancel Order
                      </button>
                    ) : (
                      <Link href={`/account/orders/${order.id}`} className="text-xs font-semibold px-4 py-2 bg-white border border-border text-foreground rounded-lg hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-1 active:scale-95">
                        Details <ChevronRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

