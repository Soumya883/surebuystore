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
            <Link href="/" className="flex items-center gap-2 no-underline">
              <div className="relative w-[180px] h-[52px] lg:w-[220px] lg:h-[64px]">
                <Image 
                  src="https://cdn2.clevup.in/111129/1644850958193_114304_logo.jpg?height=200&format=webp" 
                  alt="SureBuy Logo" 
                  fill 
                  className="object-contain object-left"
                  sizes="(max-width: 1024px) 180px, 220px"
                />
              </div>
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
