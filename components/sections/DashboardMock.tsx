'use client';

import React, { useState, useEffect } from 'react';
import { Currency, Transaction } from '@/types';
import { 
  CreditCard, Eye, EyeOff, Lock, Unlock, ArrowDownLeft, ArrowUpRight, 
  PiggyBank, TrendingUp, Plus, CheckCircle, Smartphone, Calendar, AlertCircle
} from 'lucide-react';

interface DashboardMockProps {
  currency: Currency;
  isDarkMode: boolean;
}

export default function DashboardMock({ currency, isDarkMode }: DashboardMockProps) {
  // Balance and card states
  const [balance, setBalance] = useState<number>(12450.00);
  const [isCardLocked, setIsCardLocked] = useState<boolean>(false);
  const [showCardNumber, setShowCardNumber] = useState<boolean>(false);
  const [savingsGoal, setSavingsGoal] = useState<number>(75); // percent
  const [investmentValue, setInvestmentValue] = useState<number>(3150.25);
  
  // Custom interactive mock transaction addition
  const [mockTransactions, setMockTransactions] = useState<Transaction[]>([
    { id: 't1', type: 'transfer', amount: 450, currency: 'USD', merchant: 'Safaripoint Remittance', time: '10:45 AM', status: 'completed' },
    { id: 't2', type: 'payment', amount: 12000, currency: 'KES', merchant: 'Nairobi Water Payment', time: 'Yesterday', status: 'completed' },
    { id: 't3', type: 'deposit', amount: 25000, currency: 'KES', merchant: 'M-Pesa cash-in', time: '2 days ago', status: 'completed' },
  ]);

  const [addAmount, setAddAmount] = useState<string>('');
  const [addMerchant, setAddMerchant] = useState<string>('M-Pesa');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // Currency multiplier calculation
  const getDisplayBalance = () => {
    if (currency === 'KES') {
      return (balance * 130).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' KSh';
    }
    return '$' + balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getDisplayInvestment = () => {
    if (currency === 'KES') {
      return (investmentValue * 130).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' KSh';
    }
    return '$' + investmentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Handle simulated custom user deposit
  const handleSimulatedDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmt = parseFloat(addAmount);
    if (isNaN(parsedAmt) || parsedAmt <= 0) return;

    // Convert added amount to internal USD basis for state storage
    let addedUSD = parsedAmt;
    if (currency === 'KES') {
      addedUSD = parsedAmt / 130;
    }

    setBalance((prev) => prev + addedUSD);
    
    const newTx: Transaction = {
      id: `m-${Date.now()}`,
      type: 'deposit',
      amount: parsedAmt,
      currency: currency,
      merchant: addMerchant,
      time: 'Just now',
      status: 'completed',
    };

    setMockTransactions((prev) => [newTx, ...prev]);
    setAddAmount('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className={`w-full rounded-2xl border p-5 md:p-6 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-navy-950 border-navy-800 text-slate-100 shadow-2xl shadow-navy-950/50' 
        : 'bg-white border-slate-200 text-navy-900 shadow-xl shadow-slate-200/50'
    }`}>
      
      {/* Dashboard Top Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-500 block">
            PayFlow Live Sandbox
          </span>
          <h4 className="font-display font-medium text-lg text-navy-900 dark:text-white">Active Financial Hub</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-navy-600 dark:text-slate-400">
            Simulated Node
          </span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        
        {/* Left Stats Column */}
        <div className="space-y-4">
          
          {/* Main Balance Display */}
          <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-navy-900/60 border-navy-800' : 'bg-slate-50 border-slate-150'}`}>
            <span className="text-xs text-navy-600 dark:text-slate-400 block mb-1">Total Available Cash</span>
            <div className="font-mono text-2xl md:text-3xl font-extrabold text-navy-900 dark:text-white leading-none">
              {getDisplayBalance()}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold mt-2 font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+1.45% Interest accrued today</span>
            </div>
          </div>

          {/* Savings Vault progress (Interactive!) */}
          <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-navy-900/60 border-navy-800' : 'bg-slate-50 border-slate-150'}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-navy-600 dark:text-slate-400 flex items-center gap-1">
                <PiggyBank className="w-3.5 h-3.5 text-emerald-500" />
                Savings Progress
              </span>
              <span className="font-mono text-xs font-bold text-emerald-500">{savingsGoal}%</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={savingsGoal}
              onChange={(e) => setSavingsGoal(+e.target.value)}
              className="w-full h-1.5 rounded-lg bg-slate-200 dark:bg-navy-800 accent-emerald-500 cursor-pointer mb-2"
            />
            <div className="flex justify-between items-center text-[9px] text-navy-600 dark:text-slate-400 font-mono">
              <span>Goal: {currency === 'USD' ? '$10,000' : '1.3M KSh'}</span>
              <span>Yield: 8.5% APY</span>
            </div>
          </div>

          {/* Investment Vault stats */}
          <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-navy-900/60 border-navy-800' : 'bg-slate-50 border-slate-150'}`}>
            <span className="text-xs text-navy-600 dark:text-slate-400 block mb-1">Treasury Wallet Portfolio</span>
            <div className="font-mono text-lg font-bold text-navy-900 dark:text-white leading-none">
              {getDisplayInvestment()}
            </div>
            <p className="text-[9px] text-emerald-500 font-bold mt-1.5">
              Govt. Treasury Bonds: Locked interest rate 11.2%
            </p>
          </div>

        </div>

        {/* Right Stats Column - The Virtual Debit Card (Beautiful HTML/CSS) */}
        <div className="flex flex-col justify-between">
          
          <div className={`relative h-44 rounded-xl p-5 overflow-hidden flex flex-col justify-between transition-all duration-300 ${
            isCardLocked 
              ? 'opacity-65 scale-[0.98]' 
              : 'shadow-lg shadow-emerald-500/5'
          } ${
            isDarkMode 
              ? 'bg-gradient-to-br from-navy-800 to-navy-950 border border-navy-700' 
              : 'bg-gradient-to-br from-[#0B132B] to-[#1C2541] border border-navy-900 text-white'
          }`}>
            {/* Card Watermark */}
            <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl"></div>

            {/* Card Header */}
            <div className="flex justify-between items-start z-10">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-slate-300 font-mono block">Multi-Currency Debit</span>
                <span className="font-display font-medium text-sm text-white">PayFlow Pay</span>
              </div>
              <span className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg">
                <CreditCard className="w-4 h-4 text-emerald-500" />
              </span>
            </div>

            {/* Card Number */}
            <div className="z-10 py-2">
              <span className="font-mono text-sm tracking-widest block text-white">
                {showCardNumber 
                  ? '4152 8201 9304 7721' 
                  : '••••  ••••  ••••  7721'
                }
              </span>
              <div className="flex gap-4 text-[9px] text-slate-300 font-mono mt-1">
                <span>EXP: 09/31</span>
                <span>CVV: {showCardNumber ? '254' : '•••'}</span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="flex justify-between items-center z-10 border-t border-slate-200/10 pt-2">
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
                {isCardLocked ? 'CARD FROZEN' : 'ACTIVE • VISA'}
              </span>
              <span className="text-slate-300 font-bold text-xs tracking-wider">KES/USD Wallet</span>
            </div>
          </div>

          {/* Quick card controls */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setIsCardLocked(!isCardLocked)}
              className={`flex-1 py-2 rounded-xl border font-display text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                isCardLocked 
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' 
                  : 'bg-slate-500/5 border-slate-200 dark:border-navy-800 text-navy-600 dark:text-slate-300 hover:bg-slate-500/10'
              }`}
            >
              {isCardLocked ? (
                <>
                  <Unlock className="w-3.5 h-3.5" /> Unfreeze Card
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" /> Freeze Card
                </>
              )}
            </button>
            <button
              onClick={() => setShowCardNumber(!showCardNumber)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-800 text-navy-600 dark:text-slate-300 hover:bg-slate-500/10 flex items-center justify-center transition-all"
            >
              {showCardNumber ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>

        </div>

      </div>

      {/* Cash Flow Interactive Chart Area (Raw Responsive SVG Paths) */}
      <div className={`p-4 rounded-xl border mb-6 ${isDarkMode ? 'bg-navy-900/60 border-navy-800' : 'bg-slate-50 border-slate-150'}`}>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-navy-600 dark:text-slate-400 font-medium">Monthly Cash Flow Chart</span>
          <div className="flex gap-3 text-[9px] font-mono text-navy-600 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Inflow
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-navy-500"></span> Outflow
            </span>
          </div>
        </div>

        {/* SVG Cash Flow Line Chart */}
        <div className="h-16 w-full flex items-end">
          <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
            {/* Grid Line */}
            <line x1="0" y1="10" x2="100" y2="10" stroke="#CBD5E1" strokeWidth="0.1" strokeDasharray="1" />
            
            {/* Inflow path */}
            <path d="M 0,18 Q 20,4 40,11 T 80,3 T 100,6" fill="none" stroke="#10B981" strokeWidth="1.2" />
            {/* Outflow path */}
            <path d="M 0,15 Q 15,12 35,6 T 75,12 T 100,16" fill="none" stroke="#3A506B" strokeWidth="1" strokeDasharray="1" />
          </svg>
        </div>

        <div className="flex justify-between items-center text-[8px] text-navy-600 dark:text-slate-400 font-mono mt-2">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul (Current)</span>
        </div>
      </div>

      {/* Interactive Sandbox sandbox simulator (Adds local transactions!) */}
      <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-navy-900/60 border-navy-800' : 'bg-emerald-500/[0.02] border-emerald-500/20'}`}>
        <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-500 mb-2 flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5" />
          Simulate a Transfer or Deposit:
        </h5>
        
        <form onSubmit={handleSimulatedDeposit} className="grid grid-cols-1 md:grid-cols-12 gap-2">
          <div className="md:col-span-5">
            <input
              type="number"
              placeholder={`Amount (${currency === 'USD' ? 'USD' : 'KES'})`}
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              className={`w-full text-xs p-2.5 rounded-lg border ${
                isDarkMode ? 'bg-navy-950 border-navy-800 text-white' : 'bg-white border-slate-200 text-navy-900'
              }`}
            />
          </div>
          <div className="md:col-span-4">
            <select
              value={addMerchant}
              onChange={(e) => setAddMerchant(e.target.value)}
              className={`w-full text-xs p-2.5 rounded-lg border ${
                isDarkMode ? 'bg-navy-950 border-navy-800 text-slate-300' : 'bg-white border-slate-200 text-navy-900'
              }`}
            >
              <option value="M-Pesa Cash-In">M-Pesa Deposit</option>
              <option value="Salary Remittance">Salary Deposit</option>
              <option value="NCBA Bank Payout">NCBA Bank Inbound</option>
              <option value="RiftTech Consulting">Invoicing Payment</option>
            </select>
          </div>
          <button
            type="submit"
            className="md:col-span-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold p-2.5 rounded-lg flex items-center justify-center gap-1 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </form>

        {showSuccess && (
          <div className="text-[10px] text-emerald-500 flex items-center gap-1 font-bold mt-2 font-mono">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Success! Sandbox balance updated in real-time.</span>
          </div>
        )}
      </div>

      {/* Recent Transactions List */}
      <div className="mt-6">
        <h5 className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-slate-400 mb-3 flex items-center justify-between">
          <span>Recent Transactions</span>
          <span className="text-[9px] lowercase opacity-60">real-time updates</span>
        </h5>
        <div className="space-y-2">
          {mockTransactions.map((tx) => (
            <div 
              key={tx.id}
              className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                isDarkMode ? 'bg-navy-900/40 border-navy-800/80' : 'bg-slate-50 border-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`p-1.5 rounded-lg ${
                  tx.type === 'deposit' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-navy-500/10 text-navy-500 dark:text-slate-400'
                }`}>
                  {tx.type === 'deposit' ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                </span>
                <div>
                  <div className="font-semibold text-navy-900 dark:text-white">{tx.merchant}</div>
                  <div className="text-[10px] opacity-60">{tx.time}</div>
                </div>
              </div>

              <div className="text-right">
                <div className={`font-mono font-bold ${tx.type === 'deposit' ? 'text-emerald-500' : 'text-navy-900 dark:text-white'}`}>
                  {tx.type === 'deposit' ? '+' : '-'}
                  {tx.currency === 'USD' ? '$' : ''}
                  {tx.amount.toLocaleString()}
                  {tx.currency === 'KES' ? ' KSh' : ''}
                </div>
                <div className="text-[9px] text-emerald-500 font-bold uppercase tracking-wider">Completed</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
