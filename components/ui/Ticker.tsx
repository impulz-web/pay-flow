'use client';

import React, { useEffect, useState } from 'react';
import { Currency, Transaction } from '@/types';
import { ArrowUpRight, ArrowDownLeft, ShieldCheck, Zap } from 'lucide-react';

interface TickerProps {
  currency: Currency;
  isDarkMode: boolean;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'init-0', type: 'transfer', amount: 4500, currency: 'KES', merchant: 'Airtel Money Cash-out', time: 'Just now', status: 'completed', city: 'Nairobi' },
  { id: 'init-1', type: 'payment', amount: 120, currency: 'USD', merchant: 'RiftTech Invoicing', time: '1m ago', status: 'completed', city: 'Nakuru' },
  { id: 'init-2', type: 'deposit', amount: 25000, currency: 'KES', merchant: 'M-Pesa Cash-In', time: '2m ago', status: 'completed', city: 'Mombasa' },
  { id: 'init-3', type: 'transfer', amount: 80, currency: 'USD', merchant: 'Safaripoint Remittance', time: '3m ago', status: 'completed', city: 'Kisumu' },
  { id: 'init-4', type: 'payment', amount: 18500, currency: 'KES', merchant: 'NCBA Bank Transfer', time: '5m ago', status: 'completed', city: 'Eldoret' },
  { id: 'init-5', type: 'deposit', amount: 350, currency: 'USD', merchant: 'KCB Payout', time: '7m ago', status: 'completed', city: 'Thika' },
  { id: 'init-6', type: 'transfer', amount: 12500, currency: 'KES', merchant: 'Cooperative Bank Cash-out', time: '10m ago', status: 'completed', city: 'Ruiru' },
  { id: 'init-7', type: 'payment', amount: 95, currency: 'USD', merchant: 'Nyati Corp Licensing', time: '12m ago', status: 'completed', city: 'Kikuyu' },
];

export default function Ticker({ currency, isDarkMode }: TickerProps) {
  const [tickerItems, setTickerItems] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  useEffect(() => {
    // Periodically add new realistic transactions
    const interval = setInterval(() => {
      const cities = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Ruiru', 'Kikuyu', 'Naivasha', 'Nyeri', 'Malindi', 'Kakamega'];
      const actions: { merchant: string; type: Transaction['type']; amtRange: [number, number]; curr: Currency }[] = [
        { merchant: 'M-Pesa Deposit', type: 'deposit', amtRange: [1000, 30000], curr: 'KES' },
        { merchant: 'KCB Instant Bank Cashout', type: 'transfer', amtRange: [5000, 75000], curr: 'KES' },
        { merchant: 'Global Remittance Payout', type: 'transfer', amtRange: [50, 800], curr: 'USD' },
        { merchant: 'Equity Bank Link Payout', type: 'deposit', amtRange: [2000, 15000], curr: 'KES' },
        { merchant: 'Business Invoicing', type: 'payment', amtRange: [100, 1200], curr: 'USD' },
        { merchant: 'Airtel Money Payout', type: 'transfer', amtRange: [500, 10000], curr: 'KES' },
      ];

      const selectedCity = cities[Math.floor(Math.random() * cities.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const amount = Math.floor(Math.random() * (action.amtRange[1] - action.amtRange[0])) + action.amtRange[0];

      const newTx: Transaction = {
        id: `dynamic-${Date.now()}`,
        type: action.type,
        amount,
        currency: action.curr,
        merchant: action.merchant,
        time: 'Just now',
        status: 'completed',
        city: selectedCity,
      };

      setTickerItems((prev) => [newTx, ...prev.slice(0, 15)]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const formatValue = (amount: number, txCurr: Currency) => {
    let finalAmt = amount;
    let finalCurr = txCurr;

    if (currency === 'USD' && txCurr === 'KES') {
      finalAmt = Math.round(amount / 130);
      finalCurr = 'USD';
    } else if (currency === 'KES' && txCurr === 'USD') {
      finalAmt = amount * 130;
      finalCurr = 'KES';
    }

    if (finalCurr === 'USD') {
      return `$${finalAmt.toLocaleString()}`;
    } else {
      return `${finalAmt.toLocaleString()} KSh`;
    }
  };

  return (
    <div className={`w-full py-2.5 overflow-hidden border-b transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-navy-950 border-navy-800 text-slate-300' 
        : 'bg-navy-50 border-slate-200 text-navy-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <div className="flex items-center gap-1.5 shrink-0 mr-4 font-display text-xs font-semibold uppercase tracking-wider text-emerald-500">
          <Zap className="w-3.5 h-3.5 animate-pulse" />
          <span>Live Security Ticker:</span>
        </div>
        
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="flex animate-ticker gap-8 whitespace-nowrap">
            {tickerItems.concat(tickerItems).map((tx, idx) => (
              <div 
                key={`${tx.id}-${idx}`} 
                className={`inline-flex items-center gap-2 text-xs font-medium px-2.5 py-0.5 rounded-full border transition-all ${
                  isDarkMode 
                    ? 'bg-navy-900/60 border-navy-800 text-slate-300' 
                    : 'bg-white border-slate-100 text-navy-900 shadow-sm'
                }`}
              >
                {tx.type === 'deposit' ? (
                  <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                ) : (
                  <ArrowUpRight className="w-3.5 h-3.5 text-navy-600 shrink-0" />
                )}
                <span className="font-semibold text-navy-900 dark:text-white">
                  {formatValue(tx.amount, tx.currency)}
                </span>
                <span>{tx.merchant}</span>
                <span className="opacity-40">|</span>
                <span className="text-emerald-500 font-semibold">{tx.city}</span>
                <span className="text-[10px] opacity-60">({tx.time})</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 ml-0.5 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
