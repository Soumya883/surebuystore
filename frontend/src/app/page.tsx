"use client";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Star, Search, Smartphone, Laptop, Watch, Headphones, Tablet, Tv, Camera, Gamepad2, ShoppingCart, ShieldCheck, Settings, Package } from "lucide-react";
import { useRouter } from "next/navigation";

/* ─── DATA ─── */
const SELL_CATEGORIES = [
  { name: "Phone",       icon: Smartphone, href: "/sell" },
  { name: "Laptop",      icon: Laptop,     href: "/sell/laptop" },
  { name: "Tablet",      icon: Tablet,     href: "/sell/tablet" },
  { name: "Smartwatch",  icon: Watch,      href: "/sell/smartwatch" },
  { name: "TV",          icon: Tv,         href: "/sell/tv" },
  { name: "Camera",      icon: Camera,     href: "/sell/camera" },
  { name: "Audio",       icon: Headphones, href: "/sell/audio" },
  { name: "Gaming",      icon: Gamepad2,   href: "/sell/gaming" },
];

const BRANDS = [
  { name: "Apple",    src: "https://cdn2.clevup.in/111129/cat/1645555371511_114304_cat.png?width=384&format=webp" },
  { name: "Samsung",  src: "https://cdn2.clevup.in/111129/cat/1645278560873_114304_cat.png?width=384&format=webp" },
  { name: "OnePlus",  src: "https://cdn2.clevup.in/111129/cat/1644584492225_114304_cat.png?width=384&format=webp" },
  { name: "Xiaomi",   src: "https://cdn2.clevup.in/111129/cat/1645620352255_114304_cat.png?width=384&format=webp" },
  { name: "Oppo",     src: "https://cdn2.clevup.in/111129/cat/1644584657851_114304_cat.png?width=384&format=webp" },
  { name: "Vivo",     src: "https://cdn2.clevup.in/111129/cat/1644584730219_114304_cat.png?width=384&format=webp" },
  { name: "Realme",   src: "https://cdn2.clevup.in/111129/cat/1658918058879_114304_cat.png?width=384&format=webp" },
  { name: "Google",   src: "https://cdn2.clevup.in/111129/cat/1644593699942_114304_cat.png?width=384&format=webp" },
];

const TOP_SELLING = [
  { model: "Apple iPhone 14 Pro Max", mrp: "₹1,09,900", sell: "₹48,000", img: "https://cdn2.clevup.in/111129/1676810296715_SKU-0131_0.jpg?width=600&format=webp",   brand: "Apple"   },
  { model: "Apple iPhone 13",          mrp: "₹79,900",  sell: "₹32,000", img: "https://cdn2.clevup.in/111129/1663421580279_SKU-0119_0.jpg?width=600&format=webp",   brand: "Apple"   },
  { model: "Apple iPhone 12",          mrp: "₹69,900",  sell: "₹22,000", img: "https://cdn2.clevup.in/111129/1663240526734_SKU-0118_0.jpg?width=600&format=webp",   brand: "Apple"   },
  { model: "Samsung Galaxy S23 Ultra", mrp: "₹1,24,999",sell: "₹45,000", img: "https://cdn2.clevup.in/111129/1662733475266_SKU-0117_0.jpg?width=600&format=webp",   brand: "Samsung" },
  { model: "Samsung Galaxy S22",       mrp: "₹79,999",  sell: "₹28,000", img: "https://cdn2.clevup.in/111129/1662544083730_SKU-0116_0.jpg?width=600&format=webp",   brand: "Samsung" },
  { model: "OnePlus 11 5G",            mrp: "₹56,999",  sell: "₹24,000", img: "https://cdn2.clevup.in/111129/1662733715347_SKU-0113_0.jpg?width=600&format=webp",   brand: "OnePlus" },
  { model: "OnePlus 9 Pro",            mrp: "₹64,999",  sell: "₹18,000", img: "https://cdn2.clevup.in/111129/1662366813036_SKU-0110_0.jpg?width=600&format=webp",   brand: "OnePlus" },
  { model: "Xiaomi 13 Pro",            mrp: "₹79,999",  sell: "₹26,000", img: "https://cdn2.clevup.in/111129/1662365143682_SKU-0106_0.jpg?width=600&format=webp",   brand: "Xiaomi"  },
];

const BUY_PRODUCTS = [
  { name: "iPhone 14 Pro Max", price: "₹48,999", mrp: "₹1,09,900", discount: "55%", rating: 4.9, img: "https://cdn2.clevup.in/111129/1676810296715_SKU-0131_0.jpg?width=600&format=webp" },
  { name: "Samsung S22 Ultra", price: "₹34,999", mrp: "₹79,999",   discount: "56%", rating: 4.8, img: "https://cdn2.clevup.in/111129/1663240526734_SKU-0118_0.jpg?width=600&format=webp" },
  { name: "OnePlus 11",        price: "₹24,999", mrp: "₹56,999",   discount: "56%", rating: 4.7, img: "https://cdn2.clevup.in/111129/1662733715347_SKU-0113_0.jpg?width=600&format=webp" },
  { name: "Apple iPhone 13",   price: "₹32,999", mrp: "₹79,900",   discount: "59%", rating: 4.8, img: "https://cdn2.clevup.in/111129/1663421580279_SKU-0119_0.jpg?width=600&format=webp" },
  { name: "Xiaomi 12 Pro",     price: "₹21,999", mrp: "₹62,999",   discount: "65%", rating: 4.6, img: "https://cdn2.clevup.in/111129/1662365143682_SKU-0106_0.jpg?width=600&format=webp" },
  { name: "OnePlus 9 Pro",     price: "₹18,999", mrp: "₹64,999",   discount: "70%", rating: 4.7, img: "https://cdn2.clevup.in/111129/1662366813036_SKU-0110_0.jpg?width=600&format=webp" },
];

const BLOG = [
  { title: "Best Budget Smartphones Under ₹20,000 in 2024", cat: "Buying Guide", img: "https://cdn2.clevup.in/111129/1661781986443_SKU-0104_0.jpg?width=600&format=webp" },
  { title: "How to Sell Your Old iPhone and Get the Best Price", cat: "Selling Tips", img: "https://cdn2.clevup.in/111129/1661781253340_SKU-0102_0.jpg?width=600&format=webp" },
  { title: "Samsung vs Apple: Which Brand Holds Value Better?", cat: "Comparison", img: "https://cdn2.clevup.in/111129/1661781143146_SKU-0101_0.jpg?width=600&format=webp" },
  { title: "Top 5 Refurbished Phones Worth Buying in 2024", cat: "Top Picks", img: "https://cdn2.clevup.in/111129/1661434786470_SKU-0099_0.jpg?width=600&format=webp" },
];

/* ─── STYLES ─── */
const C = {
  teal:       "#42c8b7",
  tealLight:  "#e8f9f7",
  tealDark:   "#2ba898",
  text:       "#0f0f0f",
  muted:      "#666666",
  border:     "#e8e8e8",
  bg:         "#f7f8f9",
  white:      "#ffffff",
  dark:       "#0f0f0f",
};

export default function Home() {
  const router = useRouter();

  const buyNow = (p: typeof BUY_PRODUCTS[0]) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx = cart.findIndex((i: any) => i.id === p.name);
    if (idx >= 0) cart[idx].quantity += 1;
    else cart.push({ id: p.name, title: p.name, price: parseInt(p.price.replace(/[^0-9]/g, "")), mrp: parseInt(p.mrp.replace(/[^0-9]/g, "")), images: [p.img], condition: "Refurbished", quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    router.push("/cart");
  };
  return (
    <div style={{ background: C.bg, fontFamily: "Inter, system-ui, sans-serif", color: C.text }}>

      {/* ══════════════════════════════════════════════
          HERO — Cashify style: white bg, person + text
         ══════════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-200 overflow-hidden">
        <div className="hero-container max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center min-h-[340px] gap-10 md:gap-12 py-8 md:py-0">

          {/* LEFT TEXT */}
          <div className="flex-1 flex flex-col gap-4 text-center md:text-left z-10 w-full">
            <h1 className="text-[28px] md:text-[36px] lg:text-[44px] font-black text-gray-900 leading-[1.15] m-0">
              All Your Tech.{" "}
              <span className="text-[#42c8b7]">One Trusted Place.</span>
            </h1>
            <p className="text-[14px] md:text-[15px] text-gray-500 m-0 leading-[1.7] max-w-[400px] mx-auto md:mx-0">
              Get the best price for your old devices. Free doorstep pickup, instant payment — no hassle.
            </p>

            {/* Quick search */}
            <div className="flex max-w-[440px] rounded-lg overflow-hidden border-[1.5px] border-[#42c8b7] shadow-[0_2px_12px_rgba(66,200,183,0.15)] bg-white mx-auto md:mx-0 w-full mt-2 mb-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search your phone model…"
                  className="w-full border-none outline-none bg-transparent pl-10 pr-4 py-3 text-[14px] text-gray-900"
                />
              </div>
              <Link href="/sell">
                <button className="bg-[#42c8b7] hover:bg-[#33a89a] text-white border-none px-6 h-full text-[14px] font-bold cursor-pointer transition-colors whitespace-nowrap min-h-[48px]">
                  Get Instant Price →
                </button>
              </Link>
            </div>

            {/* Quick links */}
            <div className="flex gap-2 flex-wrap justify-center md:justify-start">
              {["Apple iPhone", "Samsung", "OnePlus", "Xiaomi"].map(b => (
                <Link key={b} href={`/sell?brand=${b}`} className="text-[12px] text-[#42c8b7] no-underline px-3 py-1 rounded-full border border-[#42c8b7] bg-teal-50 font-medium hover:bg-[#42c8b7] hover:text-white transition-colors">
                  {b}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT — Person image like Cashify hero */}
          <div className="hero-right-img flex-shrink-0 w-full md:w-[340px] h-[300px] md:h-[360px] relative flex items-end justify-center md:justify-end mt-4 md:mt-0">
            {/* Teal background arc */}
            <div className="absolute right-0 bottom-0 w-full md:w-[300px] h-full md:h-[320px] rounded-t-full bg-gradient-to-b from-[#42c8b7] to-[#2ba898] opacity-15" />
            
            {/* Person image */}
            <div className="relative w-[240px] md:w-[290px] h-[280px] md:h-[350px] rounded-t-full overflow-hidden z-10">
              <Image
                src="/hero-person.png"
                alt="Sell your device - SureBuyStore"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 240px, 290px"
              />
            </div>
            
            {/* Valuation badge - Apple/Cashify style */}
            <div className="absolute bottom-[30px] md:bottom-[50px] -left-[10%] md:-left-[30px] bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white z-20 animate-float flex flex-col gap-1.5 min-w-[140px]">
              <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <span>iPhone 14 Pro</span>
                <span className="text-[#42c8b7] bg-teal-50 px-1.5 py-0.5 rounded text-[9px]">Excellent</span>
              </div>
              <div className="text-[24px] md:text-[28px] font-black text-gray-900 leading-none">₹48,000</div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#42c8b7] mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#42c8b7] animate-pulse" />
                Instant Payout
              </div>
            </div>
            
            {/* Rating badge */}
            <div className="absolute top-[10px] md:top-[20px] -right-[5%] md:-right-[10px] bg-white rounded-xl px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 z-20 flex items-center gap-2">
              <span className="text-[16px] md:text-[18px]">⭐</span>
              <div>
                <div className="text-[13px] md:text-[14px] font-black text-gray-900 leading-tight">4.9 / 5</div>
                <div className="text-[9px] md:text-[10px] text-gray-500 leading-tight font-medium">10K+ reviews</div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SELL CATEGORIES — Icon grid like Cashify
         ══════════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[18px] md:text-[22px] font-bold mb-6 text-gray-900 m-0">Sell Your Device</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {SELL_CATEGORIES.map(({ name, icon: Icon, href }) => (
              <Link key={name} href={href} className="no-underline group">
                <div className="flex flex-col items-center gap-3 p-4 md:p-5 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-[#42c8b7] hover:shadow-[0_8px_20px_rgba(66,200,183,0.12)] hover:-translate-y-1">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-teal-50 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-hover:bg-[#42c8b7]">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#42c8b7] group-hover:text-white transition-colors duration-200" />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[13px] md:text-[14px] font-bold text-gray-800 text-center">{name}</span>
                    <span className="text-[11px] font-semibold text-[#42c8b7] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                      Sell now <ChevronRight size={10} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          OFFERS BANNERS — Visually Distinct Promos
         ══════════════════════════════════════════════ */}
      <section className="px-4 py-6 md:py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Card 1: SELL Focus */}
          <div className="rounded-2xl p-6 md:p-8 text-white relative overflow-hidden min-h-[160px] md:min-h-[180px] flex flex-col justify-center shadow-[0_8px_30px_rgba(66,200,183,0.15)] transition-transform hover:-translate-y-1">
            <Image 
              src="https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=1000&auto=format&fit=crop" 
              alt="Sell gadgets" 
              fill 
              className="object-cover z-0" 
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Teal gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2ba898] to-[#42c8b7]/90 z-10 opacity-95 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10"></div>
            
            <div className="absolute right-6 bottom-6 opacity-20 z-10 transform rotate-12">
              <Smartphone size={100} />
            </div>
            
            <div className="relative z-20">
              <div className="text-[10px] md:text-[12px] font-bold uppercase tracking-wider opacity-100 mb-2 bg-white/20 backdrop-blur-md inline-block w-max px-2.5 py-1 rounded border border-white/20">Sell Today</div>
              <h3 className="text-[20px] md:text-[24px] font-black m-0 mb-4 leading-[1.2]">Earn up to 10% EXTRA<br />on all smartphones</h3>
              <Link href="/sell">
                <button className="bg-white text-[#2ba898] border-none px-6 py-2.5 rounded-lg text-[13px] font-bold cursor-pointer hover:bg-gray-50 transition-colors shadow-sm w-max flex items-center gap-2">
                  Claim Offer <ChevronRight size={14} />
                </button>
              </Link>
            </div>
          </div>

          {/* Card 2: BUY Focus (Refurbished) */}
          <div className="rounded-2xl p-6 md:p-8 text-white relative overflow-hidden min-h-[160px] md:min-h-[180px] flex flex-col justify-center shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-1">
            <Image 
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000&auto=format&fit=crop" 
              alt="Refurbished gadgets" 
              fill 
              className="object-cover z-0" 
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800/80 z-10 opacity-95"></div>
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-black/40 to-transparent z-10" />
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[140px] h-[140px] z-20 md:w-[160px] md:h-[160px] mr-2 opacity-90 drop-shadow-2xl">
               <Image src="https://cdn2.clevup.in/111129/1676810296715_SKU-0131_0.jpg?width=600&format=webp" alt="Refurbished Phones" fill className="object-contain" sizes="160px" />
            </div>
            
            <div className="relative z-20 max-w-[60%]">
              <div className="text-[10px] md:text-[12px] font-bold uppercase tracking-wider text-[#42c8b7] mb-2 bg-[#42c8b7]/15 backdrop-blur-md inline-block w-max px-2.5 py-1 rounded border border-[#42c8b7]/20">SureBuy Store</div>
              <h3 className="text-[18px] md:text-[22px] font-black m-0 mb-4 leading-[1.2]">Certified Refurbished<br />Starting <span className="text-[#42c8b7]">₹5,999</span></h3>
              <Link href="/products">
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-lg text-[13px] font-bold cursor-pointer hover:bg-white/20 transition-colors w-max flex items-center gap-2">
                  Shop Now <ChevronRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BRANDS STRIP
         ══════════════════════════════════════════════ */}
      <section className="bg-white border-y border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 overflow-hidden">
          <div className="flex-shrink-0 flex items-center gap-2">
            <span className="text-[13px] md:text-[14px] font-black text-gray-900 uppercase tracking-[0.1em]">Shop by Brand</span>
            <div className="w-8 h-[2px] bg-[#42c8b7] hidden md:block" />
          </div>
          
          <div className="flex items-center gap-6 md:gap-10 overflow-x-auto pb-2 md:pb-0 w-full no-scrollbar">
            {BRANDS.map(b => (
              <Link key={b.name} href={`/sell?brand=${b.name}`} className="flex-shrink-0 relative w-[60px] h-[36px] md:w-[70px] md:h-[40px] opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <Image src={b.src} alt={b.name} fill className="object-contain" sizes="70px" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TOP SELLING PHONES — Price table (most Cashify-like!)
         ══════════════════════════════════════════════ */}
      <section className="px-4 py-8 md:py-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] md:text-[20px] font-bold m-0 text-gray-900">Top Selling Phones</h2>
          <Link href="/sell" className="text-[13px] font-semibold text-[#42c8b7] no-underline flex items-center gap-1 hover:underline">
            View All <ChevronRight size={14} />
          </Link>
        </div>

        {/* Table wrapper with horizontal scroll for mobile */}
        <div className="bg-white rounded-xl border border-gray-200 w-full overflow-x-auto -webkit-overflow-scrolling-touch">
          <div className="min-w-[560px]">
            {/* Table header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-2 px-4 py-3 bg-teal-50/30 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              <span>Phone Model</span>
              <span>MRP</span>
              <span className="text-[#42c8b7]">SureBuy Price</span>
              <span></span>
            </div>

            {TOP_SELLING.map((phone, i) => (
              <div key={phone.model} 
                className={`grid grid-cols-[2fr_1fr_1fr_auto] gap-2 px-4 py-3 items-center transition-colors hover:bg-teal-50/50 ${i < TOP_SELLING.length - 1 ? 'border-b border-gray-100' : ''} ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
              >
                {/* Phone name + image */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-9 h-9 flex-shrink-0">
                    <Image src={phone.img} alt={phone.model} fill className="object-contain" sizes="36px" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-gray-900 text-[12px] md:text-[14px] truncate">{phone.model}</span>
                    <span className="text-[10px] text-gray-500">{phone.brand}</span>
                  </div>
                </div>
                
                {/* MRP */}
                <div className="font-medium text-[12px] text-gray-400 line-through whitespace-nowrap">
                  {phone.mrp}
                </div>
                
                {/* Surebuy Price */}
                <div className="font-bold text-[13px] md:text-[15px] text-[#42c8b7] whitespace-nowrap">
                  {phone.sell}
                </div>
                
                {/* Action */}
                <div className="flex justify-end pr-1">
                  <Link href="/sell">
                    <button className="bg-[#42c8b7] text-white border-none rounded-md px-2.5 py-1.5 text-[11px] font-bold cursor-pointer hover:bg-[#33a89a] transition-colors whitespace-nowrap">
                      Sell
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View more */}
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Link href="/sell">
            <button style={{ background: "transparent", color: C.teal, border: `1.5px solid ${C.teal}`, padding: "10px 32px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 150ms" }}
              onMouseOver={e => { e.currentTarget.style.background = C.tealLight; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; }}
            >
              View More Phones
            </button>
          </Link>
        </div>
      </section>


      {/* ══════════════════════════════════════════════
          HOW IT WORKS (New Section)
         ══════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-12 md:py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-[24px] md:text-[28px] font-black text-gray-900 mb-2">Sell Your Phone in 3 Easy Steps</h2>
            <p className="text-gray-500 text-[14px] md:text-[16px] m-0">The smartest, fastest way to get cash for your old device.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image side */}
            <div className="relative h-[250px] sm:h-[350px] lg:h-[450px] w-full rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
              <Image 
                src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1470&auto=format&fit=crop" 
                alt="Person using phone" 
                fill 
                className="object-cover" 
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Steps side */}
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Step 1 */}
              <div className="flex gap-4 md:gap-6 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-[#42c8b7] hover:shadow-md transition-all">
                <div className="w-12 h-12 flex-shrink-0 bg-teal-50 text-[#42c8b7] rounded-full flex items-center justify-center font-black text-xl">01</div>
                <div>
                  <h3 className="text-[16px] md:text-[18px] font-bold text-gray-900 mb-1">Select Device</h3>
                  <p className="text-[13px] md:text-[14px] text-gray-500 m-0 leading-relaxed">Tell us your phone model and answer a few simple questions about its current condition.</p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex gap-4 md:gap-6 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-[#42c8b7] hover:shadow-md transition-all">
                <div className="w-12 h-12 flex-shrink-0 bg-teal-50 text-[#42c8b7] rounded-full flex items-center justify-center font-black text-xl">02</div>
                <div>
                  <h3 className="text-[16px] md:text-[18px] font-bold text-gray-900 mb-1">Get Instant Price</h3>
                  <p className="text-[13px] md:text-[14px] text-gray-500 m-0 leading-relaxed">Receive the best market price instantly through our advanced AI valuation engine.</p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex gap-4 md:gap-6 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-[#42c8b7] hover:shadow-md transition-all">
                <div className="w-12 h-12 flex-shrink-0 bg-teal-50 text-[#42c8b7] rounded-full flex items-center justify-center font-black text-xl">03</div>
                <div>
                  <h3 className="text-[16px] md:text-[18px] font-bold text-gray-900 mb-1">Get Paid Instantly</h3>
                  <p className="text-[13px] md:text-[14px] text-gray-500 m-0 leading-relaxed">Schedule a free doorstep pickup and get paid instantly before the executive leaves.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BUY SECTION — Refurbished Products
         ══════════════════════════════════════════════ */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-[12px] font-bold text-[#42c8b7] uppercase tracking-wider mb-1">SureBuy Store</div>
              <h2 className="text-[24px] md:text-[28px] font-black text-gray-900 m-0">Certified Refurbished</h2>
            </div>
            <Link href="/products" className="text-[14px] font-bold text-[#42c8b7] hover:underline flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {BUY_PRODUCTS.map(p => (
              <div key={p.name} className="bg-white rounded-2xl border border-gray-200 overflow-hidden group hover:border-[#42c8b7] hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col">
                <div className="relative h-[220px] bg-gray-50 flex items-center justify-center p-6">
                  <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[11px] font-black px-2.5 py-1 rounded-md">{p.discount} OFF</div>
                  <Image src={p.img} alt={p.name} fill className="object-contain p-6 transition-transform duration-500 group-hover:scale-105" sizes="250px" />
                </div>
                
                <div className="p-5 flex flex-col gap-3 flex-1 bg-white">
                  <div className="flex items-center gap-1 text-[12px] font-bold text-gray-600">
                    <span className="text-yellow-500">⭐ {p.rating}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-[16px] font-bold text-gray-900 m-0 mb-1 line-clamp-1">{p.name}</h3>
                    <div className="text-[12px] text-gray-500 font-medium">Excellent Condition</div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-auto pt-2">
                    <span className="text-[18px] font-black text-gray-900">{p.price}</span>
                    <span className="text-[13px] font-medium text-gray-400 line-through">{p.mrp}</span>
                  </div>
                  
                  <button
                    onClick={(e) => { e.preventDefault(); buyNow(p); }}
                    className="mt-2 w-full bg-white text-[#42c8b7] border border-[#42c8b7] hover:bg-[#42c8b7] hover:text-white rounded-lg py-2.5 text-[14px] font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    Buy Now →
                  </button>
                  
                  <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-t border-gray-100 pt-3">
                    <Package size={12} /> Free Delivery <span className="w-1 h-1 bg-gray-300 rounded-full mx-1"></span> <ShieldCheck size={12} /> 7-Day Return
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TRUST / WHY BUY FROM US (Modern UI)
         ══════════════════════════════════════════════ */}
      <section className="relative text-white py-20 md:py-28 overflow-hidden">
        {/* Background Image & Overlay */}
        <Image 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1470&auto=format&fit=crop" 
          alt="Premium tech background" 
          fill 
          className="object-cover object-center z-0 scale-105" 
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-[#1b3d38]/90 z-10 backdrop-blur-sm"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-20">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-[#42c8b7]/10 border border-[#42c8b7]/20 text-[#42c8b7] text-[12px] font-bold uppercase tracking-widest mb-4">Quality Guaranteed</span>
            <h2 className="text-[32px] md:text-[44px] font-black m-0 leading-tight">
              Why Buy From <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#42c8b7] to-teal-200">SureBuy?</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-[15px] md:text-[16px]">Experience the perfect blend of premium quality, unbeatable prices, and complete peace of mind with every purchase.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="group bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/10 hover:border-[#42c8b7]/30 transition-all duration-300 hover:-translate-y-2 shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#42c8b7]/20 to-[#42c8b7]/5 border border-[#42c8b7]/20 flex items-center justify-center text-[#42c8b7] mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-[18px] md:text-[20px] font-bold text-white m-0 mb-3 group-hover:text-[#42c8b7] transition-colors">50-Point Check</h3>
              <p className="text-[14px] text-gray-400 m-0 leading-relaxed group-hover:text-gray-300 transition-colors">Every device is professionally tested and certified by our expert technicians.</p>
            </div>
            
            {/* Card 2 */}
            <div className="group bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/10 hover:border-[#42c8b7]/30 transition-all duration-300 hover:-translate-y-2 shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#42c8b7]/20 to-[#42c8b7]/5 border border-[#42c8b7]/20 flex items-center justify-center text-[#42c8b7] mb-6 group-hover:scale-110 transition-transform duration-300">
                <Settings size={28} />
              </div>
              <h3 className="text-[18px] md:text-[20px] font-bold text-white m-0 mb-3 group-hover:text-[#42c8b7] transition-colors">6-Month Warranty</h3>
              <p className="text-[14px] text-gray-400 m-0 leading-relaxed group-hover:text-gray-300 transition-colors">Free comprehensive protection included on all devices for complete peace of mind.</p>
            </div>
            
            {/* Card 3 */}
            <div className="group bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/10 hover:border-[#42c8b7]/30 transition-all duration-300 hover:-translate-y-2 shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#42c8b7]/20 to-[#42c8b7]/5 border border-[#42c8b7]/20 flex items-center justify-center text-[#42c8b7] mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <h3 className="text-[18px] md:text-[20px] font-bold text-white m-0 mb-3 group-hover:text-[#42c8b7] transition-colors">7-Day Returns</h3>
              <p className="text-[14px] text-gray-400 m-0 leading-relaxed group-hover:text-gray-300 transition-colors">Buy with absolute confidence. Enjoy easy, hassle-free refunds if you change your mind.</p>
            </div>
            
            {/* Card 4 */}
            <div className="group bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/10 hover:border-[#42c8b7]/30 transition-all duration-300 hover:-translate-y-2 shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#42c8b7]/20 to-[#42c8b7]/5 border border-[#42c8b7]/20 flex items-center justify-center text-[#42c8b7] mb-6 group-hover:scale-110 transition-transform duration-300">
                <Package size={28} />
              </div>
              <h3 className="text-[18px] md:text-[20px] font-bold text-white m-0 mb-3 group-hover:text-[#42c8b7] transition-colors">Free Delivery</h3>
              <p className="text-[14px] text-gray-400 m-0 leading-relaxed group-hover:text-gray-300 transition-colors">Fast, fully insured doorstep delivery anywhere in India at no extra cost to you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BLOG SECTION
         ══════════════════════════════════════════════ */}
      <section style={{ padding: "48px 16px", background: C.white, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Blog & Tips</h2>
            <Link href="/blog" style={{ fontSize: 13, fontWeight: 600, color: C.teal, textDecoration: "none" }}>View All →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {BLOG.map(b => (
              <Link key={b.title} href="/blog" style={{ textDecoration: "none" }}>
                <div style={{ background: C.white, borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden", transition: "box-shadow 200ms, transform 200ms" }}
                  onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                  onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
                >
                  <div style={{ position: "relative", height: 140 }}>
                    <Image src={b.img} alt={b.title} fill style={{ objectFit: "cover" }} sizes="280px" />
                  </div>
                  <div style={{ padding: 14 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "0.06em" }}>{b.cat}</span>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: "6px 0 0", lineHeight: 1.4 }}>{b.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
