"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, ChevronDown, MapPin, Menu, X, LogOut, Package } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NAV = [
  { label: "Sell", href: "/sell", hasChildren: false, subItems: [] },
  { label: "Buy", href: "/products", hasChildren: false, subItems: [] },
  { label: "Repair", href: "/repair", hasChildren: false, subItems: [] },
];

export function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [userDropdown, setUserDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setLoggedInUser(JSON.parse(u));

    const cart = localStorage.getItem("cart");
    if (cart) {
      const items = JSON.parse(cart);
      setCartCount(items.reduce((sum: number, i: any) => sum + i.quantity, 0));
    }

    // Listen for cart changes
    const handleStorage = () => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const items = JSON.parse(cart);
        setCartCount(items.reduce((sum: number, i: any) => sum + i.quantity, 0));
      } else {
        setCartCount(0);
      }
      const u = localStorage.getItem("user");
      setLoggedInUser(u ? JSON.parse(u) : null);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setLoggedInUser(null);
    setUserDropdown(false);
    router.push("/");
  };

  const handleNavClick = (e: React.MouseEvent, label: string, hasChildren: boolean) => {
    if (hasChildren) {
      e.preventDefault();
      setOpenDropdown(openDropdown === label ? null : label);
    } else {
      setMobileOpen(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm relative">
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 px-4 py-3 lg:h-20 max-w-7xl mx-auto w-full relative">
        
        {/* Mobile top row: Logo + Hamburger + Cart (only on mobile) */}
        <div className="flex items-center justify-between w-full lg:w-auto flex-shrink-0">
          <Link href="/" className="no-underline flex items-center gap-2.5">
            <div className="relative w-9 h-9 lg:w-11 lg:h-11 rounded-full overflow-hidden flex-shrink-0 bg-white border border-gray-200 shadow-sm">
              <Image 
                src="/logo.png" 
                alt="SureBuy Logo" 
                fill 
                className="object-cover"
                priority
                sizes="44px"
              />
            </div>
            <span className="font-black text-[18px] lg:text-[22px] tracking-tight text-gray-900 leading-none">
              SureBuy<span className="text-[#42c8b7]">Store</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 lg:hidden">
            <Link href="/cart" className="relative p-2 text-gray-800">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#ff6b35] text-white rounded-full w-5 h-5 text-[11px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-gray-800 bg-gray-100 rounded-md">
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Search Bar - Full width on mobile, flexible on desktop */}
        <div className={`w-full flex-1 max-w-none lg:max-w-[400px] xl:max-w-[500px] relative ${mobileOpen ? 'block' : 'hidden lg:block'}`}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-[16px] h-[16px]" />
          <input
            type="text"
            placeholder="Search phones, laptops..."
            aria-label="Search products"
            className="w-full bg-[#f7f8f9] border border-gray-200 rounded-lg text-gray-900 text-[14px] pl-9 pr-4 py-2.5 outline-none focus:border-[#42c8b7] focus:ring-2 focus:ring-[#42c8b7]/20 transition-all"
            suppressHydrationWarning
          />
        </div>

        {/* Main navigation links */}
        <nav className={`w-full lg:w-auto ${mobileOpen ? 'block' : 'hidden lg:block'}`}>
          <ul className="flex flex-col lg:flex-row gap-1 lg:gap-6 m-0 p-0 list-none">
            {NAV.map(item => (
              <li key={item.label} className="border-b lg:border-b-0 border-gray-100 last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center py-3 px-2 lg:p-0 text-[15px] font-bold text-gray-800 no-underline hover:text-[#42c8b7] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop nav actions (Store, Cart, Login) */}
        <div className={`w-full lg:w-auto flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 lg:ml-auto ${mobileOpen ? 'flex' : 'hidden lg:flex'}`}>
          
          {/* City/Store selector */}
          <div className="relative flex items-center bg-gray-50 lg:bg-transparent rounded-lg border border-gray-200 lg:border-transparent">
            <MapPin size={16} className="text-[#42c8b7] absolute left-2.5 pointer-events-none" />
            <select className="appearance-none bg-transparent border-none cursor-pointer text-gray-900 text-[13.5px] font-bold py-2.5 pl-8 pr-7 rounded-md w-full outline-none" suppressHydrationWarning>
              <option value="">Store</option>
              <option value="bhubaneswar">Bhubaneswar</option>
              <option value="cuttack">Cuttack</option>
              <option value="puri">Puri</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 pointer-events-none text-gray-900" />
          </div>

          {/* Desktop Cart Icon */}
          <Link href="/cart" className="relative hidden lg:flex items-center p-2 text-gray-800 no-underline hover:text-[#42c8b7] transition-colors">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#ff6b35] text-white rounded-full w-4 h-4 text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth: Login or User Menu */}
          {!loggedInUser ? (
            <Link href="/auth" className="flex items-center justify-center bg-[#42c8b7] hover:bg-[#33a89a] text-white rounded-md px-5 py-2 text-[14px] font-bold transition-colors no-underline">
              Login
            </Link>
          ) : (
            <div className="relative z-[60]">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 bg-transparent border border-gray-200 rounded-lg px-3 py-1.5 cursor-pointer text-[14px] text-gray-800 w-full lg:w-auto justify-between lg:justify-start hover:border-[#42c8b7] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#42c8b7] flex items-center justify-center text-white font-bold text-[12px]">
                    {loggedInUser.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="font-bold max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap">{loggedInUser.name}</span>
                </div>
                <ChevronDown size={14} className={`transition-transform duration-200 ${userDropdown ? 'rotate-180' : ''}`} />
              </button>

              {userDropdown && (
                <div className="absolute right-0 lg:right-0 top-full mt-2 bg-white shadow-xl rounded-xl border border-gray-100 min-w-[220px] py-2 z-[100]">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="font-bold text-[14px] text-gray-900">{loggedInUser.name}</div>
                    <div className="text-[12px] text-gray-500">{loggedInUser.email}</div>
                    {loggedInUser.role === "ADMIN" && <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md mt-1 inline-block font-bold">Admin</span>}
                  </div>
                  
                  {loggedInUser.role === "ADMIN" && (
                    <Link href="/admin" onClick={() => setUserDropdown(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] font-medium text-gray-700 no-underline hover:bg-teal-50 hover:text-[#42c8b7]">
                      <User size={16} /> Admin Dashboard
                    </Link>
                  )}
                  <Link href="/account/orders" onClick={() => setUserDropdown(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] font-medium text-gray-700 no-underline hover:bg-teal-50 hover:text-[#42c8b7]">
                    <Package size={16} /> My Orders
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] font-medium text-red-600 bg-transparent border-none cursor-pointer w-full text-left hover:bg-red-50">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Mobile CTA - Only visible on small screens */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-[100] lg:hidden">
        <Link href="/sell" className="flex items-center justify-center w-full bg-gray-900 text-white rounded-lg py-3 text-[15px] font-bold no-underline hover:bg-gray-800 transition-colors">
          Sell Your Phone &nbsp;<span className="text-[#42c8b7]">→ Get Instant Price</span>
        </Link>
      </div>
    </header>
  );
}
