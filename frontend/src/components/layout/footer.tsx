"use client";
import Link from "next/link";
import Image from "next/image";
import { Smartphone } from "lucide-react";

const FOOTER_LINKS = {
  Sell: [
    { label: "Sell Old Phone",     href: "/sell" },
    { label: "Sell Old Laptop",    href: "/sell/laptop" },
    { label: "Sell Old Tablet",    href: "/sell/tablet" },
    { label: "Sell Smartwatch",    href: "/sell/smartwatch" },
  ],
  Buy: [
    { label: "Refurbished Phones", href: "/products" },
    { label: "Refurbished Laptops",href: "/products/laptops" },
    { label: "Best Deals",         href: "/deals" },
  ],
  Company: [
    { label: "About Us",    href: "/about" },
    { label: "Contact Us",  href: "/contact" },
    { label: "Careers",     href: "/careers" },
    { label: "Blog",        href: "/blog" },
  ],
  Support: [
    { label: "Privacy Policy",  href: "/privacy" },
    { label: "Terms of Service",href: "/terms" },
    { label: "Return Policy",   href: "/returns" },
    { label: "FAQ",             href: "/faq" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-white pt-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
          
          {/* Brand - takes up full width on mobile, 2 cols on lg */}
          <div className="col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 no-underline">
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden flex-shrink-0 bg-white border border-gray-700">
                <Image 
                  src="/logo.png" 
                  alt="SureBuy Logo" 
                  fill 
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <span className="font-black text-[20px] text-white tracking-tight">
                SureBuy<span className="text-[#42c8b7]">Store</span>
              </span>
            </Link>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Facebook", "Twitter", "Instagram", "LinkedIn"].map(s => (
                <Link key={s} href="#" className="text-[12px] text-[#707070] no-underline px-2.5 py-1 border border-[#2a2a2a] rounded-md hover:border-[#42c8b7] transition-colors">
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="col-span-1">
              <h3 className="text-[13px] font-bold text-white uppercase tracking-wider mb-4">{heading}</h3>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[13px] text-[#707070] no-underline hover:text-[#42c8b7] transition-colors block">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1f1f1f] p-4 text-center">
        <p className="text-[12px] text-[#555555] m-0">
          &copy; {new Date().getFullYear()} SureBuyStore. All rights reserved. Made in India 🇮🇳
        </p>
      </div>
    </footer>
  );
}
