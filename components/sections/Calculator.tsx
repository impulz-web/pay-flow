'use client';

/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect } from 'react';
import { Currency } from '@/types';
import { TrendingUp, RefreshCw, Calculator as CalcIcon, Info } from 'lucide-react';

interface CalculatorProps {
  currency: Currency;
  isDarkMode: boolean;
}

interface Rate {
  code: string;
  name: string;
  buy: number;
  sell: number;
  change: number; // positive or negative
}

export default function Calculator({ currency, isDarkMode }: CalculatorProps) {
  // State for Calculator
  const [initialDeposit, setInitialDeposit] = useState<number>(currency === 'USD' ? 1000 : 130000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(currency === 'USD' ? 200 : 25000);
  const [interestRate, setInterestRate] = useState<number>(8.5); // high yield
  const [years, setYears] = useState<number>(5);

  // Exchange rate state
  const [rates, setRates] = useState<Rate[]>([
    { code: 'USD/KES', name: 'US Dollar', buy: 129.50, sell: 131.20, change: -0.15 },
    { code: 'EUR/KES', name: 'Euro', buy: 139.80, sell: 141.50, change: 0.22 },
    { code: 'GBP/KES', name: 'British Pound', buy: 164.20, sell: 166.00, change: 0.08 },
    { code: 'ZAR/KES', name: 'South African Rand', buy: 7.02, sell: 7.25, change: -0.45 },
    { code: 'KES/UGX', name: 'Ugandan Shilling', buy: 28.10, sell: 29.30, change: 0.12 },
    { code: 'KES/TZS', name: 'Tanzanian Shilling', buy: 19.40, sell: 20.30, change: 0.05 },
  ]);

  const [lastUpdated, setLastUpdated] = useState<string>('05:42:18');

  // Trigger conversion when currency toggle changes
  useEffect(() => {
    if (currency === 'USD') {
      // Convert KES inputs to USD
      setInitialDeposit((prev) => Math.round(prev / 130));
      setMonthlyContribution((prev) => Math.round(prev / 130));
    } else {
      // Convert USD inputs to KES
      setInitialDeposit((prev) => Math.round(prev * 130));
      setMonthlyContribution((prev) => Math.round(prev * 130));
    }
  }, [currency]);

  // Exchange rate simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setRates((prevRates) =>
        prevRates.map((rate) => {
          const fluctuation = (Math.random() - 0.5) * 0.15;
          const newBuy = Math.max(1, +(rate.buy + fluctuation).toFixed(2));
          const newSell = Math.max(1, +(rate.sell + fluctuation).toFixed(2));
          const change = +(rate.change + (Math.random() - 0.5) * 0.1).toFixed(2);
          return {
            ...rate,
            buy: newBuy,
            sell: newSell,
            change,
          };
        })
      );
      const now = new Date();
      setLastUpdated(now.toTimeString().split(' ')[0]);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Compute compound interest
  const calculateSavings = () => {
    const P = initialDeposit;
    const PMT = monthlyContribution;
    const r = interestRate / 100;
    const n = 12; // compound monthly
    const t = years;

    const nt = n * t;
    const rn = r / n;

    // Principal compound
    const principalPart = P * Math.pow(1 + rn, nt);

    // Monthly payments compound
    let monthlyPart = 0;
    if (rn > 0) {
      monthlyPart = PMT * ((Math.pow(1 + rn, nt) - 1) / rn) * (1 + rn);
    } else {
      monthlyPart = PMT * nt;
    }

    const totalSavings = principalPart + monthlyPart;
    const totalInvested = P + (PMT * nt);
    const interestEarned = Math.max(0, totalSavings - totalInvested);

    return {
      totalSavings: Math.round(totalSavings),
      totalInvested: Math.round(totalInvested),
      interestEarned: Math.round(interestEarned),
    };
  };

  const results = calculateSavings();

  const formatCurrencyValue = (val: number) => {
    if (currency === 'USD') {
      return `$${val.toLocaleString()}`;
    } else {
      return `${val.toLocaleString()} KSh`;
    }
  };

  return (
    <section id="pricing-calculator" className={`py-20 border-b transition-colors duration-300 ${
      isDarkMode ? 'bg-navy-900 border-navy-800 text-slate-100' : 'bg-navy-50/50 border-slate-100 text-navy-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-500 font-display text-xs font-semibold uppercase tracking-wider block mb-2">
            Grow Your Wealth
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4">
            Interactive Financial Calculator & Live Exchange Rates
          </h2>
          <p className={`${isDarkMode ? 'text-slate-400' : 'text-navy-600'} text-lg`}>
            Plan your next strategic financial move. Visualize the powerful impact of PayFlow&apos;s compound interest system across all Kenyan cities.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Compound Savings Calculator (8 Cols) */}
          <div className={`lg:col-span-7 rounded-2xl border p-6 md:p-8 transition-colors ${
            isDarkMode ? 'bg-navy-950 border-navy-800' : 'bg-white border-slate-200/80 shadow-md'
          }`}>
            <div className="flex items-center gap-3 mb-6 border-b pb-4 border-slate-200/20">
              <CalcIcon className="w-5 h-5 text-emerald-500" />
              <h3 className="font-display font-medium text-xl">High-Yield Wealth Planner</h3>
            </div>

            <div className="space-y-6">
              {/* Initial Deposit Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-navy-600 dark:text-slate-300">Initial Deposit</label>
                  <span className="font-mono text-sm font-bold text-emerald-500">
                    {formatCurrencyValue(initialDeposit)}
                  </span>
                </div>
                <input
                  type="range"
                  min={currency === 'USD' ? 100 : 10000}
                  max={currency === 'USD' ? 50000 : 5000000}
                  step={currency === 'USD' ? 100 : 10000}
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(+e.target.value)}
                  className="w-full h-2 rounded-lg bg-slate-200 dark:bg-navy-800 accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Monthly Contribution Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-navy-600 dark:text-slate-300">Monthly Contribution</label>
                  <span className="font-mono text-sm font-bold text-emerald-500">
                    {formatCurrencyValue(monthlyContribution)}
                  </span>
                </div>
                <input
                  type="range"
                  min={currency === 'USD' ? 10 : 1000}
                  max={currency === 'USD' ? 5000 : 500000}
                  step={currency === 'USD' ? 10 : 1000}
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(+e.target.value)}
                  className="w-full h-2 rounded-lg bg-slate-200 dark:bg-navy-800 accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Interest Rate Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-navy-600 dark:text-slate-300">Target Annual Yield (APY)</label>
                  <span className="font-mono text-sm font-bold text-emerald-500">
                    {interestRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(+e.target.value)}
                  className="w-full h-2 rounded-lg bg-slate-200 dark:bg-navy-800 accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Years Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-navy-600 dark:text-slate-300">Investment Duration</label>
                  <span className="font-mono text-sm font-bold text-emerald-500">
                    {years} {years === 1 ? 'Year' : 'Years'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(+e.target.value)}
                  className="w-full h-2 rounded-lg bg-slate-200 dark:bg-navy-800 accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Compound Visual Output Panel */}
            <div className={`mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 rounded-xl p-4 border ${
              isDarkMode ? 'bg-navy-900 border-navy-800' : 'bg-navy-50/50 border-slate-100'
            }`}>
              <div className="p-2">
                <span className="text-xs uppercase tracking-wider text-navy-600 dark:text-slate-400 block mb-1">Total Invested</span>
                <span className="font-mono text-lg font-bold text-navy-900 dark:text-white">
                  {formatCurrencyValue(results.totalInvested)}
                </span>
              </div>
              <div className="p-2 border-t md:border-t-0 md:border-l border-slate-200/20">
                <span className="text-xs uppercase tracking-wider text-navy-600 dark:text-slate-400 block mb-1">Interest Accumulated</span>
                <span className="font-mono text-lg font-bold text-emerald-500">
                  {formatCurrencyValue(results.interestEarned)}
                </span>
              </div>
              <div className="p-2 border-t md:border-t-0 md:border-l border-slate-200/20">
                <span className="text-xs uppercase tracking-wider text-navy-600 dark:text-slate-400 block mb-1 font-semibold text-emerald-600">Total Projection</span>
                <span className="font-mono text-xl font-extrabold text-navy-900 dark:text-white block">
                  {formatCurrencyValue(results.totalSavings)}
                </span>
              </div>
            </div>

            {/* Custom SVG Growth Progress Chart */}
            <div className="mt-6 relative h-28 w-full border border-slate-200/20 rounded-xl overflow-hidden bg-slate-500/5 p-4 flex flex-col justify-end">
              <div className="absolute top-3 left-4 flex items-center gap-1.5 text-xs text-navy-600 dark:text-slate-400 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>Simulated Compound Velocity Growth</span>
              </div>
              <svg className="w-full h-16 text-emerald-500" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path
                  d={`M 0,20 Q 25,${20 - (results.totalInvested / results.totalSavings) * 15} 50,${20 - (results.totalInvested / results.totalSavings) * 18} T 100,2`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  d={`M 0,20 Q 25,${20 - (results.totalInvested / results.totalSavings) * 15} 50,${20 - (results.totalInvested / results.totalSavings) * 18} T 100,2 L 100,20 L 0,20 Z`}
                  fill="url(#gradient-green-calc)"
                  opacity="0.08"
                />
                <defs>
                  <linearGradient id="gradient-green-calc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="flex justify-between items-center text-[10px] text-navy-600 dark:text-slate-400 mt-2 font-mono">
                <span>Start</span>
                <span>Year {Math.round(years / 2)}</span>
                <span>Year {years} (Success)</span>
              </div>
            </div>
          </div>

          {/* Live Exchange Rate Widget (4 Cols) */}
          <div className={`lg:col-span-5 rounded-2xl border p-6 transition-colors ${
            isDarkMode ? 'bg-navy-950 border-navy-800' : 'bg-white border-slate-200/80 shadow-md'
          }`}>
            <div className="flex justify-between items-center mb-6 border-b pb-4 border-slate-200/20">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-emerald-500 animate-spin" style={{ animationDuration: '6s' }} />
                <h3 className="font-display font-medium text-xl">Live Remittance Exchange Rates</h3>
              </div>
              <span className="font-mono text-[10px] bg-emerald-500/10 text-emerald-500 font-semibold px-2 py-0.5 rounded">
                Active
              </span>
            </div>

            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-navy-600'} mb-5`}>
              Remit money instantly to and from Kenya. Rates update in real-time below using Central Bank compliant reference streams.
            </p>

            <div className="space-y-3">
              {rates.map((rate) => (
                <div 
                  key={rate.code}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all hover:scale-[1.01] ${
                    isDarkMode 
                      ? 'bg-navy-900/60 border-navy-800' 
                      : 'bg-slate-50 border-slate-100 hover:shadow-sm'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs tracking-wide text-navy-900 dark:text-white">
                      {rate.code}
                    </div>
                    <div className="text-[10px] text-navy-600 dark:text-slate-400">
                      {rate.name}
                    </div>
                  </div>

                  <div className="text-right flex gap-4">
                    <div>
                      <div className="text-[10px] text-navy-600 dark:text-slate-400">Buy</div>
                      <div className="font-mono text-xs font-semibold text-navy-900 dark:text-white">{rate.buy}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-navy-600 dark:text-slate-400">Sell</div>
                      <div className="font-mono text-xs font-semibold text-navy-900 dark:text-white">{rate.sell}</div>
                    </div>
                    <div className="w-14 text-right">
                      <div className="text-[10px] text-navy-600 dark:text-slate-400">Change</div>
                      <div className={`font-mono text-xs font-bold ${
                        rate.change >= 0 ? 'text-emerald-500' : 'text-rose-500'
                      }`}>
                        {rate.change >= 0 ? '+' : ''}{rate.change}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200/20 flex justify-between items-center text-[10px] text-navy-600 dark:text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Info className="w-3 h-3 text-emerald-500" />
                No remittance markups or processing delays
              </span>
              <span>Updated: {lastUpdated}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
