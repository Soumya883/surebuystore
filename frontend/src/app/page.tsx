"use client";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Search, Smartphone, Laptop, Watch, Headphones, Tablet, Tv, Camera, Gamepad2, ShieldCheck, Settings, Package, Receipt, BadgeCheck, Zap } from "lucide-react";
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
];

const BUY_PRODUCTS = [
  { name: "iPhone 14 Pro Max", price: "₹48,999", mrp: "₹1,09,900", condition: "Excellent", img: "https://cdn2.clevup.in/111129/1676810296715_SKU-0131_0.jpg?width=600&format=webp" },
  { name: "Samsung S22 Ultra", price: "₹34,999", mrp: "₹79,999",   condition: "Good",      img: "https://cdn2.clevup.in/111129/1663240526734_SKU-0118_0.jpg?width=600&format=webp" },
  { name: "OnePlus 11",        price: "₹24,999", mrp: "₹56,999",   condition: "Excellent", img: "https://cdn2.clevup.in/111129/1662733715347_SKU-0113_0.jpg?width=600&format=webp" },
  { name: "Apple iPhone 13",   price: "₹32,999", mrp: "₹79,900",   condition: "Excellent", img: "https://cdn2.clevup.in/111129/1663421580279_SKU-0119_0.jpg?width=600&format=webp" },
];

export default function Home() {
  const router = useRouter();

  const buyNow = (p: typeof BUY_PRODUCTS[0]) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx = cart.findIndex((i: any) => i.id === p.name);
    if (idx >= 0) cart[idx].quantity += 1;
    else cart.push({ id: p.name, title: p.name, price: parseInt(p.price.replace(/[^0-9]/g, "")), mrp: parseInt(p.mrp.replace(/[^0-9]/g, "")), images: [p.img], condition: p.condition, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    router.push("/cart");
  };
  
  return (
    <div className="bg-[var(--val-paper)] text-[var(--val-charcoal)]">

      {/* ══════════════════════════════════════════════
          HERO — Valuation Slip / Ledger Identity
         ══════════════════════════════════════════════ */}
      <section className="bg-[var(--val-navy)] text-[var(--val-paper)] overflow-hidden relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--val-paper) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12 relative z-10">
          
          {/* LEFT TEXT */}
          <div className="flex-1 flex flex-col gap-6 w-full max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 w-max text-xs font-medium tracking-wide uppercase">
              <BadgeCheck size={14} className="text-[var(--val-brass)]" /> Certified Appraisal
            </div>
            
            <h1 className="text-4xl md:text-6xl text-[var(--val-paper)] leading-[1.1] m-0">
              The true value of <br/> your technology.
            </h1>
            
            <p className="text-lg text-white/70 m-0 leading-relaxed max-w-[480px]">
              Instant, data-driven valuations. Sell your old devices for what they're actually worth, with guaranteed payouts and free doorstep pickup.
            </p>

            {/* Quick search */}
            <div className="flex w-full rounded-md overflow-hidden bg-white mt-4 p-1">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter device model (e.g. iPhone 14)"
                  className="w-full border-none outline-none bg-transparent pl-12 pr-4 py-4 text-base text-[var(--val-navy)] placeholder:text-gray-400 font-medium"
                />
              </div>
              <Link href="/sell">
                <button className="bg-[var(--val-emerald)] hover:bg-[var(--val-emerald-dark)] text-white border-none px-8 py-4 rounded font-medium cursor-pointer transition-colors h-full flex items-center gap-2">
                  Appraise <ChevronRight size={16} />
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT — The "Valuation Slip" Hero Graphic */}
          <div className="flex-1 w-full flex justify-center md:justify-end">
            <div className="bg-[var(--val-paper)] text-[var(--val-navy)] w-full max-w-[380px] p-8 shadow-2xl relative transform rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
              {/* Receipt zig-zag top edge */}
              <div className="absolute -top-2 left-0 right-0 h-4 bg-[var(--val-paper)]" style={{ clipPath: 'polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)' }}></div>
              
              <div className="flex justify-between items-start border-b-2 border-[var(--val-navy)] pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-widest text-[var(--val-navy)] m-0">Appraisal</h3>
                  <p className="text-xs font-mono text-[var(--val-charcoal)] mt-1">NO. 8492-AX</p>
                </div>
                <Receipt className="text-[var(--val-brass)] opacity-80" size={28} />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-dashed border-[var(--val-border)] pb-2">
                  <span className="text-sm font-medium">Device</span>
                  <span className="font-mono text-sm font-bold">iPhone 14 Pro</span>
                </div>
                <div className="flex justify-between items-end border-b border-dashed border-[var(--val-border)] pb-2">
                  <span className="text-sm font-medium">Condition</span>
                  <span className="font-mono text-sm font-bold text-[var(--val-emerald)]">Flawless</span>
                </div>
                <div className="flex justify-between items-end border-b border-dashed border-[var(--val-border)] pb-2">
                  <span className="text-sm font-medium">Market Est.</span>
                  <span className="font-mono text-sm line-through text-gray-400">₹42,000</span>
                </div>
              </div>

              <div className="mt-8 bg-[var(--val-navy)] text-[var(--val-paper)] p-6 -mx-8 relative overflow-hidden">
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--val-paper)]"></div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--val-paper)]"></div>
                
                <span className="block text-xs uppercase tracking-widest text-white/70 mb-1">Guaranteed Payout</span>
                <span className="block text-4xl font-mono font-bold text-[var(--val-brass)]">₹48,500</span>
              </div>
              
              {/* Receipt zig-zag bottom edge */}
              <div className="absolute -bottom-2 left-0 right-0 h-4 bg-[var(--val-navy)]" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)' }}></div>
            </div>
          </div>
          
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SELL CATEGORIES — Minimal & Refined
         ══════════════════════════════════════════════ */}
      <section className="border-b border-[var(--val-border)] py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl m-0 mb-2">Sell Your Device</h2>
              <p className="text-[var(--val-charcoal)] m-0">Select a category to get an instant appraisal.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {SELL_CATEGORIES.map(({ name, icon: Icon, href }) => (
              <Link key={name} href={href} className="group block no-underline">
                <div className="flex flex-col items-center justify-center p-6 border border-[var(--val-border)] bg-[var(--val-paper)] rounded-sm transition-all duration-300 hover:border-[var(--val-navy)] hover:bg-[var(--val-navy)] hover:text-white group">
                  <Icon className="w-8 h-8 mb-4 text-[var(--val-emerald)] group-hover:text-[var(--val-brass)] transition-colors" strokeWidth={1.5} />
                  <span className="text-sm font-medium">{name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TOP SELLING PHONES — Ledger Row Layout
         ══════════════════════════════════════════════ */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl m-0 mb-2">Current Valuations</h2>
            <p className="text-[var(--val-charcoal)] m-0">Live pricing for our most appraised models.</p>
          </div>
          <Link href="/sell" className="text-sm font-medium text-[var(--val-emerald)] flex items-center gap-1 hover:underline">
            View Ledger <ChevronRight size={16} />
          </Link>
        </div>

        <div className="border border-[var(--val-border)] bg-white p-1">
          {/* Header Row */}
          <div className="grid grid-cols-[3fr_1.5fr_1.5fr_auto] gap-4 px-6 py-4 bg-[var(--val-paper)] border-b border-[var(--val-border)] text-xs font-bold uppercase tracking-widest text-[var(--val-charcoal)]">
            <span>Model / Asset</span>
            <span>Est. Retail</span>
            <span className="text-[var(--val-emerald-dark)]">Payout Value</span>
            <span></span>
          </div>

          {/* Ledger Rows */}
          {TOP_SELLING.map((phone, i) => (
            <div key={phone.model} 
              className={`grid grid-cols-[3fr_1.5fr_1.5fr_auto] gap-4 px-6 py-4 items-center transition-colors hover:bg-[var(--val-paper)] ${i < TOP_SELLING.length - 1 ? 'border-b border-dashed border-[var(--val-border)]' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12">
                  <Image src={phone.img} alt={phone.model} fill className="object-contain mix-blend-multiply" sizes="48px" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[var(--val-navy)] text-base">{phone.model}</span>
                  <span className="text-xs font-mono text-[var(--val-charcoal)] mt-1">{phone.brand}</span>
                </div>
              </div>
              
              <div className="font-mono text-sm text-[var(--val-charcoal)]">
                {phone.mrp}
              </div>
              
              <div className="font-mono text-lg font-bold text-[var(--val-emerald-dark)]">
                {phone.sell}
              </div>
              
              <div className="flex justify-end">
                <Link href="/sell">
                  <button className="val-btn-outline py-1.5 px-4 min-h-0 text-xs">
                    Appraise
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HOW IT WORKS (Valuation Process)
         ══════════════════════════════════════════════ */}
      <section className="bg-white border-y border-[var(--val-border)] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* The Ledger Motif */}
            <div className="bg-[var(--val-paper)] p-8 md:p-12 border border-[var(--val-border)] relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--val-navy)] via-[var(--val-emerald)] to-[var(--val-brass)]"></div>
              
              <h2 className="text-3xl mb-8 leading-tight">The smart way to <br/>liquidate your assets.</h2>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <span className="font-mono text-2xl font-bold text-[var(--val-brass)]">01</span>
                  <div>
                    <h3 className="text-lg font-bold font-sans text-[var(--val-navy)] mb-2">Evaluate</h3>
                    <p className="text-sm leading-relaxed text-[var(--val-charcoal)]">Provide your device model and its current condition. Our pricing engine cross-references market data instantly.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="font-mono text-2xl font-bold text-[var(--val-brass)]">02</span>
                  <div>
                    <h3 className="text-lg font-bold font-sans text-[var(--val-navy)] mb-2">Secure</h3>
                    <p className="text-sm leading-relaxed text-[var(--val-charcoal)]">Lock in your valuation. Schedule a free doorstep pickup at your convenience.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="font-mono text-2xl font-bold text-[var(--val-brass)]">03</span>
                  <div>
                    <h3 className="text-lg font-bold font-sans text-[var(--val-navy)] mb-2">Liquidate</h3>
                    <p className="text-sm leading-relaxed text-[var(--val-charcoal)]">Our executive verifies the device at your door, and you receive the exact quoted amount instantly.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Brands block */}
            <div className="space-y-8">
              <h3 className="text-2xl m-0 border-b-2 border-[var(--val-navy)] pb-4 inline-block">Accepted Marques</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {BRANDS.map(b => (
                  <Link key={b.name} href={`/sell?brand=${b.name}`} className="flex items-center gap-3 p-4 border border-[var(--val-border)] bg-[var(--val-paper)] hover:border-[var(--val-navy)] transition-colors grayscale hover:grayscale-0">
                    <div className="w-8 h-8 relative">
                      <Image src={b.src} alt={b.name} fill className="object-contain" sizes="32px" />
                    </div>
                    <span className="font-medium text-sm font-sans text-[var(--val-navy)]">{b.name}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BUY SECTION — Refurbished Products (Stub Cards)
         ══════════════════════════════════════════════ */}
      <section className="bg-[var(--val-paper)] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl m-0 mb-2">Certified Inventory</h2>
              <p className="text-[var(--val-charcoal)] m-0">Premium refurbished devices, guaranteed.</p>
            </div>
            <Link href="/products" className="text-sm font-medium text-[var(--val-emerald)] flex items-center gap-1 hover:underline">
              View Catalog <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUY_PRODUCTS.map(p => (
              <div key={p.name} className="flex flex-col bg-white border border-[var(--val-border)] group hover:border-[var(--val-navy)] transition-colors cursor-pointer">
                {/* Image Area */}
                <div className="relative h-[240px] border-b border-dashed border-[var(--val-border)] flex items-center justify-center p-8 bg-[var(--val-paper)]">
                  <Image src={p.img} alt={p.name} fill className="object-contain p-8 mix-blend-multiply transition-transform duration-500 group-hover:scale-105" sizes="250px" />
                </div>
                
                {/* The "Valuation Stub" Data Area */}
                <div className="p-6 flex flex-col flex-1 relative">
                  {/* Perforated ticket indents */}
                  <div className="absolute -top-3 -left-[1px] w-5 h-5 rounded-full bg-[var(--val-paper)] border-r border-b border-[var(--val-border)] transform rotate-45 border-transparent"></div>
                  <div className="absolute -top-3 -right-[1px] w-5 h-5 rounded-full bg-[var(--val-paper)] border-l border-b border-[var(--val-border)] transform -rotate-45 border-transparent"></div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--val-charcoal)] border border-[var(--val-charcoal)] px-2 py-0.5">{p.condition}</span>
                    <span className="text-xs font-mono text-[var(--val-charcoal)] line-through">{p.mrp}</span>
                  </div>
                  
                  <h3 className="text-base font-bold font-sans text-[var(--val-navy)] m-0 mb-4">{p.name}</h3>
                  
                  <div className="mt-auto">
                    <div className="text-[10px] uppercase tracking-widest text-[var(--val-emerald)] font-bold mb-1">SureBuy Price</div>
                    <div className="val-price text-2xl mb-5 text-[var(--val-navy)]">{p.price}</div>
                    
                    <button
                      onClick={(e) => { e.preventDefault(); buyNow(p); }}
                      className="w-full bg-[var(--val-navy)] text-white hover:bg-[var(--val-charcoal)] py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 font-sans"
                    >
                      Acquire Asset
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TRUST / WHY BUY FROM US (Clean Paper Ledger aesthetic)
         ══════════════════════════════════════════════ */}
      <section className="border-t border-[var(--val-border)] bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
            
            <div className="md:col-span-5 flex flex-col justify-center">
              <h2 className="text-4xl m-0 leading-tight text-[var(--val-navy)]">Trust is our currency.</h2>
              <p className="text-[var(--val-charcoal)] mt-6 text-lg leading-relaxed max-w-md">
                We remove the ambiguity from secondary market transactions. Every device is professionally audited and backed by concrete guarantees.
              </p>
              <div className="mt-10 pt-10 border-t-2 border-[var(--val-navy)]">
                <p className="font-mono text-sm text-[var(--val-navy)] font-bold uppercase tracking-widest mb-2">Audited & Certified by SureBuy</p>
                <div className="flex gap-2">
                  <div className="w-12 h-1 bg-[var(--val-emerald)]"></div>
                  <div className="w-2 h-1 bg-[var(--val-emerald)]"></div>
                  <div className="w-2 h-1 bg-[var(--val-emerald)]"></div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
              <div className="flex gap-5">
                <div className="mt-1">
                  <ShieldCheck size={28} className="text-[var(--val-brass)]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-sans text-[var(--val-navy)] mb-2">50-Point Audit</h3>
                  <p className="text-sm leading-relaxed text-[var(--val-charcoal)]">Every device is subjected to a rigorous diagnostic test covering hardware, battery health, and software authenticity.</p>
                </div>
              </div>
              
              <div className="flex gap-5">
                <div className="mt-1">
                  <Settings size={28} className="text-[var(--val-brass)]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-sans text-[var(--val-navy)] mb-2">6-Month Warranty</h3>
                  <p className="text-sm leading-relaxed text-[var(--val-charcoal)]">Complete coverage against functional defects. If it fails our standard, we fix or replace it at no cost.</p>
                </div>
              </div>
              
              <div className="flex gap-5">
                <div className="mt-1">
                  <Zap size={28} className="text-[var(--val-brass)]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-sans text-[var(--val-navy)] mb-2">Instant Liquidity</h3>
                  <p className="text-sm leading-relaxed text-[var(--val-charcoal)]">Valuations are guaranteed. You receive immediate transfer of funds upon physical verification.</p>
                </div>
              </div>
              
              <div className="flex gap-5">
                <div className="mt-1">
                  <Package size={28} className="text-[var(--val-brass)]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-sans text-[var(--val-navy)] mb-2">White-Glove Logistics</h3>
                  <p className="text-sm leading-relaxed text-[var(--val-charcoal)]">Secure doorstep pickup and insured delivery nationwide, fully managed by our logistics network.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
