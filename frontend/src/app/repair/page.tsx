"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Settings, Smartphone, Laptop, Watch, Tablet, ShieldCheck, Clock, MapPin, Search, ArrowLeft } from "lucide-react";

const REPAIR_SERVICES = [
  { name: "Screen Replacement", price: "Starting ₹1,499", time: "30 Mins", icon: Smartphone },
  { name: "Battery Replacement", price: "Starting ₹899",  time: "20 Mins", icon: Settings },
  { name: "Mic / Speaker Issue", price: "Starting ₹599",  time: "45 Mins", icon: Smartphone },
  { name: "Motherboard Repair", price: "Upon Inspection",time: "1-2 Days", icon: Laptop },
];

const DEVICE_TYPES = [
  { name: "Apple",     icon: Smartphone },
  { name: "Samsung",   icon: Smartphone },
  { name: "OnePlus",   icon: Smartphone },
  { name: "Xiaomi",    icon: Smartphone },
];

const MODELS: Record<string, string[]> = {
  Apple: ["iPhone 14 Pro Max", "iPhone 13", "iPhone 12"],
  Samsung: ["Galaxy S22 Ultra", "Galaxy S21", "Galaxy Z Fold"],
  OnePlus: ["OnePlus 11 5G", "OnePlus 9 Pro", "OnePlus Nord"],
  Xiaomi: ["Xiaomi 12 Pro", "Redmi Note 12", "Mi 11X"],
};

export default function RepairPage() {
  const [step, setStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<any>(null);

  const handleBrand = (brand: string) => { setSelectedBrand(brand); setStep(2); };
  const handleModel = (model: string) => { setSelectedModel(model); setStep(3); };
  const handleIssue = (issue: any) => { setSelectedIssue(issue); setStep(4); };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-16 lg:py-24 overflow-hidden">
        {/* Background Image & Overlay */}
        <Image 
          src="https://images.unsplash.com/photo-1592899677977-9c10ca588bb3?q=80&w=1470&auto=format&fit=crop" 
          alt="Device Repair" 
          fill 
          className="object-cover object-center z-0" 
        />
        <div className="absolute inset-0 bg-gray-900/90 z-10 backdrop-blur-[2px]"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#42c8b7]/20 blur-[100px] rounded-full z-10 hidden md:block"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-[#42c8b7]/10 blur-[80px] rounded-full z-10 hidden md:block"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block bg-[#42c8b7]/20 border border-[#42c8b7]/30 text-[#42c8b7] px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest mb-6">Doorstep Repair</div>
            <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-black leading-[1.1] mb-6">
              Mobile Repair at your <span className="text-[#42c8b7]">Doorstep</span>
            </h1>
            <p className="text-[16px] md:text-[18px] text-gray-300 leading-relaxed max-w-[540px] mx-auto lg:mx-0 mb-10">
              Screen broken? Battery draining fast? Get your device fixed by certified experts at your home or office in just 30 minutes. 6-months warranty included.
            </p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl font-bold text-[14px]">
                <ShieldCheck size={18} className="text-[#42c8b7]"/> 6 Months Warranty
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl font-bold text-[14px]">
                <Clock size={18} className="text-[#42c8b7]"/> 30 Min Repair
              </div>
            </div>
          </div>

          {/* Right Card / Wizard */}
          <div className="w-full max-w-[500px] flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-h-[350px] flex flex-col relative text-gray-900 border border-gray-100">
              
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <h3 className="text-[20px] font-black text-gray-900 mb-6">Select Brand</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {DEVICE_TYPES.map(({ name, icon: Icon }) => (
                      <button 
                        key={name} 
                        onClick={() => handleBrand(name)} 
                        className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#42c8b7] hover:bg-teal-50 transition-all font-bold text-[14px] group"
                      >
                        <Icon size={20} className="text-gray-400 group-hover:text-[#42c8b7] transition-colors" /> {name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => setStep(1)} className="text-gray-400 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                      <ArrowLeft size={18} />
                    </button>
                    <h3 className="text-[20px] font-black text-gray-900 m-0">Select {selectedBrand} Model</h3>
                  </div>
                  <div className="flex flex-col gap-3 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar">
                    {MODELS[selectedBrand]?.map((model) => (
                      <button 
                        key={model} 
                        onClick={() => handleModel(model)} 
                        className="text-left p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#42c8b7] hover:bg-teal-50 transition-all font-bold text-[14px]"
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => setStep(2)} className="text-gray-400 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                      <ArrowLeft size={18} />
                    </button>
                    <h3 className="text-[20px] font-black text-gray-900 m-0">Select Issue</h3>
                  </div>
                  <div className="flex flex-col gap-3 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar">
                    {REPAIR_SERVICES.map((issue) => (
                      <button 
                        key={issue.name} 
                        onClick={() => handleIssue(issue)} 
                        className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#42c8b7] hover:bg-teal-50 transition-all font-bold text-[14px]"
                      >
                        <span>{issue.name}</span>
                        <span className="text-[#42c8b7]">{issue.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && selectedIssue && (
                <div className="flex flex-col items-center justify-center text-center h-full flex-1 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-teal-100">
                    <selectedIssue.icon size={32} className="text-[#42c8b7]" />
                  </div>
                  <h3 className="text-[22px] font-black text-gray-900 mb-2">Estimated Cost: <span className="text-[#42c8b7]">{selectedIssue.price}</span></h3>
                  <p className="text-[14px] text-gray-500 mb-8 font-medium">For {selectedBrand} {selectedModel} - {selectedIssue.name}</p>
                  
                  <div className="flex w-full gap-3 mt-auto">
                    <button onClick={() => setStep(1)} className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 font-bold transition-colors">Start Over</button>
                    <button className="flex-[2] py-3.5 bg-[#42c8b7] hover:bg-[#2ba898] rounded-xl text-white font-bold transition-colors shadow-md">Book Agent Now</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[28px] md:text-[36px] font-black text-gray-900 mb-3">Our Repair Services</h2>
          <p className="text-[16px] md:text-[18px] text-gray-500 m-0">Transparent pricing. Genuine parts. Expert technicians.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REPAIR_SERVICES.map((s) => (
            <div 
              key={s.name} 
              className="bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-[#42c8b7] cursor-pointer group"
            >
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <s.icon size={24} className="text-[#42c8b7]" />
              </div>
              <h3 className="text-[18px] font-bold text-gray-900 mb-3">{s.name}</h3>
              <div className="flex items-center gap-3 text-[14px] text-gray-500 mb-5">
                <span className="flex items-center gap-1.5"><Clock size={16} /> {s.time}</span>
              </div>
              <div className="text-[16px] font-black text-[#42c8b7]">{s.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 md:py-24 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[28px] md:text-[36px] font-black text-gray-900 text-center mb-12 md:mb-16">How it works?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-[2px] bg-gray-100 z-0"></div>
            
            {[
              { step: "1", title: "Check Price", desc: "Select device and issue to get instant repair cost.", icon: Search },
              { step: "2", title: "Schedule",    desc: "Book a convenient time and provide your address.", icon: Clock },
              { step: "3", title: "Repair",      desc: "Our expert visits you and fixes the device on spot.", icon: Settings },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative z-10 bg-white md:bg-transparent">
                <div className="w-16 h-16 rounded-full bg-gray-50 border-4 border-white shadow-sm flex items-center justify-center text-[#42c8b7] mb-6 relative">
                  <item.icon size={24} />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full text-[12px] font-bold flex items-center justify-center">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-[20px] font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-[15px] text-gray-500 leading-relaxed max-w-[280px] m-0">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
