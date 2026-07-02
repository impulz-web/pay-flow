'use client';

import React, { useState } from 'react';
import { KenyanCity } from '@/types';
import { MapPin, Building, Shield, ArrowRight, Zap, Info, Landmark } from 'lucide-react';

const KENYAN_CITIES: KenyanCity[] = [
  {
    name: 'Nairobi',
    county: 'Nairobi County (Capital)',
    speedMs: 1.8,
    partners: ['Equity Bank CBD', 'KCB Towers', 'M-Pesa Cash-In Terminal'],
    merchantsCount: 42500,
    remittanceRate: 0.1,
    popularProduct: 'Instant Tech Invoicing & Salary Advance Disbursements',
  },
  {
    name: 'Mombasa',
    county: 'Mombasa County (Coast)',
    speedMs: 2.1,
    partners: ['NCBA Port Authority Branch', 'Absa Mombasa Marina', 'M-Pesa agents'],
    merchantsCount: 18400,
    remittanceRate: 0.15,
    popularProduct: 'Port Logistical Invoice Financing & Tourism Vendor Payouts',
  },
  {
    name: 'Kisumu',
    county: 'Kisumu County (Lakeside)',
    speedMs: 2.3,
    partners: ['Cooperative Bank Kisumu', 'Stanbic Lakeside', 'Airtel Money Agent'],
    merchantsCount: 11200,
    remittanceRate: 0.12,
    popularProduct: 'Lakeside Agricultural Trade Financing & Fish Market Cash-out',
  },
  {
    name: 'Nakuru',
    county: 'Nakuru County (Rift Valley)',
    speedMs: 2.2,
    partners: ['KCB Nakuru Central', 'Equity Nakuru West', 'M-Pesa agency network'],
    merchantsCount: 9500,
    remittanceRate: 0.12,
    popularProduct: 'Rift Valley Agricultural Produce & Dairy Farming Payouts',
  },
  {
    name: 'Eldoret',
    county: 'Uasin Gishu County',
    speedMs: 2.0,
    partners: ['NCBA Eldoret Hub', 'Family Bank Eldoret', 'M-Pesa cashpoints'],
    merchantsCount: 8800,
    remittanceRate: 0.11,
    popularProduct: 'Cereal Agricultural Supply Chain Credits & Athlete Remittances',
  },
  {
    name: 'Ruiru',
    county: 'Kiambu County (Industrial)',
    speedMs: 1.9,
    partners: ['Equity Ruiru Industrial', 'Coop Bank Ruiru', 'M-Pesa Super Agent'],
    merchantsCount: 7500,
    remittanceRate: 0.10,
    popularProduct: 'Manufacturing Plant Supplier Payouts & Warehousing Credits',
  },
  {
    name: 'Thika',
    county: 'Kiambu County',
    speedMs: 2.2,
    partners: ['KCB Thika Branch', 'Absa Thika Bypass', 'Airtel Money Superstore'],
    merchantsCount: 6900,
    remittanceRate: 0.12,
    popularProduct: 'Pineapple Agro-processing Trade & Juja student remittances',
  },
  {
    name: 'Kikuyu',
    county: 'Kiambu County',
    speedMs: 1.9,
    partners: ['NCBA Kikuyu Center', 'Family Bank Kikuyu', 'M-Pesa Hub'],
    merchantsCount: 5400,
    remittanceRate: 0.11,
    popularProduct: 'SME Commuter Trade Settlement & Local Market Liquidity',
  },
];

interface CitySelectorProps {
  isDarkMode: boolean;
}

export default function CitySelector({ isDarkMode }: CitySelectorProps) {
  const [selectedCity, setSelectedCity] = useState<KenyanCity>(KENYAN_CITIES[0]);

  return (
    <section id="kenyan-cities" className={`py-20 border-b transition-colors duration-300 ${
      isDarkMode ? 'bg-navy-950 border-navy-800 text-slate-100' : 'bg-white border-slate-100 text-navy-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-500 font-display text-xs font-semibold uppercase tracking-wider block mb-2">
            Kenyan Financial Network
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4 text-navy-900 dark:text-white">
            Optimized Digital Banking Across All 47 Counties
          </h2>
          <p className={`${isDarkMode ? 'text-slate-400' : 'text-navy-600'} text-lg`}>
            PayFlow is integrated directly with the central clearing networks and mobile money gateways across Kenya. Tap a city to explore localized speeds, licensing, and partnerships.
          </p>
        </div>

        {/* Cities Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Cities Selector buttons (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-slate-400 mb-2 block">
              Select City to View Local Network Node:
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {KENYAN_CITIES.map((city) => (
                <button
                  key={city.name}
                  onClick={() => setSelectedCity(city)}
                  className={`text-left p-4 rounded-xl border font-display transition-all flex items-center justify-between ${
                    selectedCity.name === city.name
                      ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10 text-navy-900 dark:text-white'
                      : isDarkMode
                        ? 'border-navy-800 bg-navy-900/40 text-slate-400 hover:border-navy-700 hover:text-slate-200'
                        : 'border-slate-200 bg-slate-50 text-navy-600 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className={`w-4.5 h-4.5 ${selectedCity.name === city.name ? 'text-emerald-500' : 'text-slate-400'}`} />
                    <span className="font-semibold text-sm">{city.name}</span>
                  </div>
                  <span className="text-[10px] opacity-60 hidden lg:inline">{city.county}</span>
                </button>
              ))}
            </div>
          </div>

          {/* City Local Node Data Card (7 Cols) */}
          <div className={`lg:col-span-7 rounded-2xl border p-6 md:p-8 transition-colors flex flex-col justify-between ${
            isDarkMode ? 'bg-navy-900 border-navy-800' : 'bg-slate-50 border-slate-200/80'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-6 border-b pb-4 border-slate-200/20">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Building className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-display font-medium text-2xl text-navy-900 dark:text-white">
                      Node {selectedCity.name}
                    </h3>
                    <p className="text-xs text-navy-600 dark:text-slate-400">
                      Clearing Center: {selectedCity.county}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-500 block mb-1">
                    CBK Compliant Node
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-navy-900 dark:text-white">
                    <Zap className="w-3.5 h-3.5 text-emerald-500" />
                    Speed: {selectedCity.speedMs}s
                  </span>
                </div>
              </div>

              {/* Node statistics */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-navy-950 border-navy-800' : 'bg-white border-slate-200/80 shadow-sm'}`}>
                  <span className="text-[10px] uppercase tracking-wider text-navy-600 dark:text-slate-400 block mb-1">Active Merchants</span>
                  <span className="font-mono font-extrabold text-lg text-emerald-500">
                    {selectedCity.merchantsCount.toLocaleString()}+
                  </span>
                </div>
                <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-navy-950 border-navy-800' : 'bg-white border-slate-200/80 shadow-sm'}`}>
                  <span className="text-[10px] uppercase tracking-wider text-navy-600 dark:text-slate-400 block mb-1">Instant Remittance fee</span>
                  <span className="font-mono font-extrabold text-lg text-navy-900 dark:text-white">
                    {selectedCity.remittanceRate}%
                  </span>
                </div>
                <div className={`p-4 rounded-xl border col-span-2 md:col-span-1 ${isDarkMode ? 'bg-navy-950 border-navy-800' : 'bg-white border-slate-200/80 shadow-sm'}`}>
                  <span className="text-[10px] uppercase tracking-wider text-navy-600 dark:text-slate-400 block mb-1">Status</span>
                  <span className="font-mono font-bold text-xs text-emerald-500 flex items-center gap-1.5 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Fully Operational
                  </span>
                </div>
              </div>

              {/* Local Integrations and Banks */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-emerald-500" />
                    Local Partner Bank Hubs in {selectedCity.name}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCity.partners.map((p) => (
                      <span 
                        key={p} 
                        className={`text-xs px-3 py-1 rounded-full border ${
                          isDarkMode ? 'bg-navy-950 border-navy-800 text-slate-300' : 'bg-white border-slate-200 text-navy-700 shadow-sm'
                        }`}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-500" />
                    Popular Local Service Integration:
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-navy-800'} font-medium`}>
                    {selectedCity.popularProduct}
                  </p>
                </div>
              </div>
            </div>

            {/* Note compliance footer of node */}
            <div className="pt-4 border-t border-slate-200/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-[11px] text-navy-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Info className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                Zero delayed processing between Nairobi hub and {selectedCity.name} Node
              </span>
              <button className="text-emerald-500 font-bold flex items-center gap-1 hover:gap-1.5 transition-all text-xs font-display">
                Open Local Account <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
