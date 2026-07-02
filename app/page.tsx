'use client';

import React, { useState, useEffect } from 'react';
import { Currency } from '@/types';
import Ticker from '@/components/ui/Ticker';
import DashboardMock from '@/components/sections/DashboardMock';
import CitySelector from '@/components/sections/CitySelector';
import Calculator from '@/components/sections/Calculator';
import FAQ from '@/components/sections/FAQ';
import ChatWidget from '@/components/sections/ChatWidget';

// Lucide icons
import { 
  ArrowRight, ArrowUpRight, Lock, Shield, Check, CheckCircle, TrendingUp,
  Smartphone, CreditCard, Globe, PiggyBank, Activity, Star, Sparkles, Moon, Sun, 
  RefreshCw, Plus, Wallet, Briefcase, QrCode, Building, Zap, ShieldAlert,
  Fingerprint, CheckSquare, Menu, X, Percent
} from 'lucide-react';

export default function Home() {
  const [currency, setCurrency] = useState<Currency>('KES');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showWatchDemo, setShowWatchDemo] = useState<boolean>(false);
  const [showAccountModal, setShowAccountModal] = useState<boolean>(false);
  const [pricingInterval, setPricingInterval] = useState<'monthly' | 'annual'>('monthly');
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'mobile' | 'business' | 'savings' | 'insights'>('mobile');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');

  // Sticky CTA show state on scroll
  const [showStickyCta, setShowStickyCta] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowWatchDemo(false);
    alert('Demo registration successful. A product specialist will contact you shortly.');
  };

  // Convert generic currency values dynamically
  const formatVal = (amountUSD: number) => {
    if (currency === 'KES') {
      const amtKES = Math.round(amountUSD * 130);
      return `${amtKES.toLocaleString()} KSh`;
    }
    return `$${amountUSD.toLocaleString()}`;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      isDarkMode ? 'bg-navy-950 text-slate-100' : 'bg-white text-navy-900'
    }`}>
      
      {/* Live Transaction Ticker at top */}
      <Ticker currency={currency} isDarkMode={isDarkMode} />

      {/* Sticky Header */}
      <header className={`sticky top-0 z-40 transition-colors duration-300 backdrop-blur-md border-b ${
        isDarkMode 
          ? 'bg-navy-950/90 border-navy-800' 
          : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 font-display font-bold text-xl text-navy-900 dark:text-white">
            <span className="p-1.5 bg-emerald-500 text-white rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </span>
            <span>Pay<span className="text-emerald-500">Flow</span></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <a href="#features" className="hover:text-emerald-500 transition-colors">Personal</a>
            <a href="#showcase" className="hover:text-emerald-500 transition-colors">Business</a>
            <a href="#pricing-calculator" className="hover:text-emerald-500 transition-colors">Pricing</a>
            <a href="#security" className="hover:text-emerald-500 transition-colors">Security</a>
            <a href="#kenyan-cities" className="hover:text-emerald-500 transition-colors">Cities supported</a>
            <a href="#faq" className="hover:text-emerald-500 transition-colors">Resources</a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Currency Selector */}
            <div className={`flex items-center rounded-lg p-0.5 border ${
              isDarkMode ? 'border-navy-800 bg-navy-900/60' : 'border-slate-200 bg-slate-100'
            }`}>
              <button 
                onClick={() => setCurrency('KES')}
                className={`text-[10px] font-bold font-mono px-2 py-1 rounded transition-all ${
                  currency === 'KES' 
                    ? 'bg-emerald-500 text-white' 
                    : 'text-navy-600 dark:text-slate-400'
                }`}
              >
                KES (KSh)
              </button>
              <button 
                onClick={() => setCurrency('USD')}
                className={`text-[10px] font-bold font-mono px-2 py-1 rounded transition-all ${
                  currency === 'USD' 
                    ? 'bg-emerald-500 text-white' 
                    : 'text-navy-600 dark:text-slate-400'
                }`}
              >
                USD ($)
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg border transition-colors ${
                isDarkMode ? 'border-navy-800 hover:bg-navy-900 text-emerald-500' : 'border-slate-200 hover:bg-slate-100 text-navy-600'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button 
              onClick={() => setShowAccountModal(true)}
              className="text-sm font-semibold hover:text-emerald-500 transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => setShowAccountModal(true)}
              className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold text-sm px-5 py-2 rounded-full transition-all shadow-lg shadow-emerald-500/20 hover:scale-102"
            >
              Open Account
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-navy-800"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-emerald-500" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-navy-800"
              aria-label="Open navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden fixed inset-0 z-30 transition-colors ${
          isDarkMode ? 'bg-navy-950/95 text-white' : 'bg-white/95 text-navy-900'
        } pt-20 px-6 space-y-6`}>
          <nav className="flex flex-col gap-5 text-lg font-semibold border-b pb-6 border-slate-200/10">
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Personal Banking</a>
            <a href="#showcase" onClick={() => setIsMobileMenuOpen(false)}>Business Core</a>
            <a href="#pricing-calculator" onClick={() => setIsMobileMenuOpen(false)}>Pricing & APY</a>
            <a href="#security" onClick={() => setIsMobileMenuOpen(false)}>Trust & Security</a>
            <a href="#kenyan-cities" onClick={() => setIsMobileMenuOpen(false)}>Counties Network</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>Frequently Asked</a>
          </nav>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Select Currency:</span>
              <div className="inline-flex rounded-lg p-0.5 border border-slate-200 dark:border-navy-800 bg-slate-500/5">
                <button 
                  onClick={() => { setCurrency('KES'); setIsMobileMenuOpen(false); }}
                  className={`text-xs font-mono font-bold px-3 py-1.5 rounded ${currency === 'KES' ? 'bg-emerald-500 text-white' : ''}`}
                >
                  KES (KSh)
                </button>
                <button 
                  onClick={() => { setCurrency('USD'); setIsMobileMenuOpen(false); }}
                  className={`text-xs font-mono font-bold px-3 py-1.5 rounded ${currency === 'USD' ? 'bg-emerald-500 text-white' : ''}`}
                >
                  USD ($)
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => { setShowAccountModal(true); setIsMobileMenuOpen(false); }}
              className="w-full py-3 border border-slate-200 dark:border-navy-800 font-semibold rounded-xl text-center"
            >
              Login
            </button>
            <button 
              onClick={() => { setShowAccountModal(true); setIsMobileMenuOpen(false); }}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl text-center"
            >
              Open Free Account
            </button>
          </div>
        </div>
      )}

      {/* 2. Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-slate-200/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left copy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Fast-Growing Digital Bank of Kenya
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight text-navy-900 dark:text-white leading-none">
              Smarter digital banking built for <span className="text-emerald-500 font-semibold">individuals and businesses</span>.
            </h1>
            <p className={`text-lg md:text-xl ${isDarkMode ? 'text-slate-400' : 'text-navy-600'} leading-relaxed`}>
              Open a free account today. Remit money instantly, create virtual multi-currency cards, and budget intelligently across Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and beyond.
            </p>
            
            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setShowAccountModal(true)}
                className="px-8 py-4 bg-[#001B44] dark:bg-emerald-500 text-white dark:text-navy-950 hover:bg-opacity-90 active:scale-95 font-semibold rounded-full shadow-xl shadow-slate-900/10 dark:shadow-emerald-500/10 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                Open Free Account
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
              <button 
                onClick={() => setShowWatchDemo(true)}
                className={`px-8 py-4 font-semibold rounded-full border text-center flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isDarkMode 
                    ? 'border-navy-800 hover:bg-navy-900 text-slate-300' 
                    : 'border-slate-200 hover:bg-slate-50 text-navy-800'
                }`}
              >
                Watch Demo Account
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-slate-200/10 flex items-center gap-8">
              <div>
                <span className="font-mono text-xl font-bold block text-navy-900 dark:text-white">8.5% APY</span>
                <span className="text-xs text-navy-600 dark:text-slate-400">Yield on Savings</span>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-navy-800"></div>
              <div>
                <span className="font-mono text-xl font-bold block text-navy-900 dark:text-white">Zero</span>
                <span className="text-xs text-navy-600 dark:text-slate-400">Monthly Hidden Fees</span>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-navy-800"></div>
              <div>
                <span className="font-mono text-xl font-bold block text-navy-900 dark:text-white">CBK</span>
                <span className="text-xs text-navy-600 dark:text-slate-400">Compliance Standard</span>
              </div>
            </div>

          </div>

          {/* Right Sandbox banking dashboard mock */}
          <div className="lg:col-span-6 w-full relative">
            <DashboardMock currency={currency} isDarkMode={isDarkMode} />
          </div>

        </div>
      </section>

      {/* 3. Trusted By */}
      <section className={`py-12 border-b transition-colors ${
        isDarkMode ? 'bg-navy-950/50 border-navy-800' : 'bg-slate-50 border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-slate-400 mb-8">
            Empowering modern financial flows at leading corporate hubs:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-65">
            <div className="font-display font-bold text-lg text-navy-600 dark:text-slate-300 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-emerald-500" />
              Kesho Ventures
            </div>
            <div className="font-display font-bold text-lg text-navy-600 dark:text-slate-300 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-500" />
              Safaripoint Ltd
            </div>
            <div className="font-display font-bold text-lg text-navy-600 dark:text-slate-300 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-500" />
              RiftTech Group
            </div>
            <div className="font-display font-bold text-lg text-navy-600 dark:text-slate-300 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-emerald-500" />
              Nyati Capital
            </div>
            <div className="font-display font-bold text-lg text-navy-600 dark:text-slate-300 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-emerald-500" />
              Kilimanjaro Corp
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Features */}
      <section id="features" className="py-20 border-b border-slate-200/10">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-500 font-display text-xs font-semibold uppercase tracking-wider block mb-2">
              Next-Gen Services
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4 text-navy-900 dark:text-white">
              Smarter tools built to secure and scale your wealth
            </h2>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-navy-600'} text-lg`}>
              Every feature is engineered to provide premium reliability, military-grade compliance, and instantaneous settlement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
              isDarkMode ? 'bg-navy-900/40 border-navy-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <span className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl inline-block mb-4">
                <RefreshCw className="w-6 h-6" />
              </span>
              <h3 className="font-display font-semibold text-lg mb-2 text-navy-900 dark:text-white">Instant Transfers</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-navy-600'} leading-relaxed`}>
                Settle payments in under 2 seconds. Transfer directly to major local banks and mobile money (M-Pesa, Airtel Money) instantly, 24/7.
              </p>
            </div>

            {/* Card 2 */}
            <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
              isDarkMode ? 'bg-navy-900/40 border-navy-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <span className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl inline-block mb-4">
                <PiggyBank className="w-6 h-6" />
              </span>
              <h3 className="font-display font-semibold text-lg mb-2 text-navy-900 dark:text-white">Smart Budgeting</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-navy-600'} leading-relaxed`}>
                Configure automatic limits, allocate funds dynamically to dedicated savings buckets, and earn a steady 8.5% compound APY.
              </p>
            </div>

            {/* Card 3 */}
            <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
              isDarkMode ? 'bg-navy-900/40 border-navy-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <span className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl inline-block mb-4">
                <CreditCard className="w-6 h-6" />
              </span>
              <h3 className="font-display font-semibold text-lg mb-2 text-navy-900 dark:text-white">Virtual Cards</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-navy-600'} leading-relaxed`}>
                Generate global multi-currency virtual debit cards instantly. Freeze, limit, and manage online purchase tokens securely.
              </p>
            </div>

            {/* Card 4 */}
            <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
              isDarkMode ? 'bg-navy-900/40 border-navy-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <span className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl inline-block mb-4">
                <Wallet className="w-6 h-6" />
              </span>
              <h3 className="font-display font-semibold text-lg mb-2 text-navy-900 dark:text-white">Investment Wallet</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-navy-600'} leading-relaxed`}>
                Gain seamless access to high-yield treasury bonds and global assets with transparent trading and settlement.
              </p>
            </div>

            {/* Card 5 */}
            <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
              isDarkMode ? 'bg-navy-900/40 border-navy-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <span className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl inline-block mb-4">
                <Briefcase className="w-6 h-6" />
              </span>
              <h3 className="font-display font-semibold text-lg mb-2 text-navy-900 dark:text-white">Business Payments</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-navy-600'} leading-relaxed`}>
                Issue commercial invoices, execute mass payouts, and utilize custom developer-friendly APIs to scale payment clearing.
              </p>
            </div>

            {/* Card 6 */}
            <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
              isDarkMode ? 'bg-navy-900/40 border-navy-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <span className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl inline-block mb-4">
                <Activity className="w-6 h-6" />
              </span>
              <h3 className="font-display font-semibold text-lg mb-2 text-navy-900 dark:text-white">Expense Tracking</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-navy-600'} leading-relaxed`}>
                Categorize payments automatically in real-time. Export transaction history sheets for tax or auditing filing instantly.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Interactive Product Showcase */}
      <section id="showcase" className={`py-20 border-b transition-colors ${
        isDarkMode ? 'bg-navy-950 border-navy-800' : 'bg-slate-50 border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-emerald-500 font-display text-xs font-semibold uppercase tracking-wider block mb-2">
              Product Showcase
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4 text-navy-900 dark:text-white">
              Designed for simple, modern execution
            </h2>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-navy-600'} text-lg`}>
              Explore how PayFlow optimizes digital workflows across mobile, tablets, and desktop terminals.
            </p>
          </div>

          {/* Navigation Tab list */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 max-w-2xl mx-auto">
            {[
              { id: 'mobile', label: 'Mobile Banking App' },
              { id: 'business', label: 'Business Hub Terminal' },
              { id: 'savings', label: 'Savings & High APY Vaults' },
              { id: 'insights', label: 'AI Financial Insights' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveShowcaseTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border font-display cursor-pointer ${
                  activeShowcaseTab === tab.id
                    ? 'bg-navy-900 border-navy-900 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-navy-950'
                    : isDarkMode
                      ? 'border-navy-850 hover:bg-navy-900 text-slate-300'
                      : 'border-slate-200 hover:bg-slate-100 bg-white text-navy-600 shadow-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Display Area */}
          <div className={`rounded-2xl border p-6 md:p-10 transition-colors ${
            isDarkMode ? 'bg-navy-900/60 border-navy-800' : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Showcase visual demo */}
              <div className="lg:col-span-6 space-y-4">
                
                {activeShowcaseTab === 'mobile' && (
                  <div className="p-5 rounded-xl border border-dashed border-emerald-500/20 bg-emerald-500/[0.02] space-y-4 text-left">
                    <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">Mobile App Simulator</span>
                    <h4 className="font-display font-medium text-xl text-navy-900 dark:text-white">Seamless Multi-Currency Wallet</h4>
                    <p className="text-sm text-navy-600 dark:text-slate-400">
                      Manage balances in USD and KES simultaneously. Move funds to and from M-Pesa instantly with institutional mid-market rates.
                    </p>
                    {/* Visual representation */}
                    <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-3">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                        <span>USD Wallet</span>
                        <span>Available Balance</span>
                      </div>
                      <div className="text-white text-2xl font-mono font-extrabold">$14,850.45</div>
                      <div className="flex gap-2">
                        <span className="text-[10px] px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Convert to KSh</span>
                        <span className="text-[10px] px-2.5 py-1 rounded bg-slate-500/10 text-slate-300 border border-slate-200/10">Cashout to M-Pesa</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeShowcaseTab === 'business' && (
                  <div className="p-5 rounded-xl border border-dashed border-emerald-500/20 bg-emerald-500/[0.02] space-y-4 text-left">
                    <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">Business Clearing Node</span>
                    <h4 className="font-display font-medium text-xl text-navy-900 dark:text-white">Enterprise Invoice Settlements</h4>
                    <p className="text-sm text-navy-600 dark:text-slate-400">
                      Generate, issue, and reconcile custom business invoice contracts automatically. Accept instant wire or card disbursements securely.
                    </p>
                    <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-2 text-left">
                      <div className="text-[10px] text-slate-400 font-mono uppercase">Pending Merchant Invoices</div>
                      <div className="flex justify-between items-center p-2 rounded bg-navy-900 text-xs border border-navy-800">
                        <span className="font-semibold text-white">INV-25010 (RiftTech)</span>
                        <span className="text-emerald-500 font-mono font-bold">120,500 KSh</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-navy-900 text-xs border border-navy-800">
                        <span className="font-semibold text-white">INV-25011 (Nyati Group)</span>
                        <span className="text-emerald-500 font-mono font-bold">$1,450.00</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeShowcaseTab === 'savings' && (
                  <div className="p-5 rounded-xl border border-dashed border-emerald-500/20 bg-emerald-500/[0.02] space-y-4 text-left">
                    <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">Savings Compounding Node</span>
                    <h4 className="font-display font-medium text-xl text-navy-900 dark:text-white">Automated Micro-Savings</h4>
                    <p className="text-sm text-navy-600 dark:text-slate-400">
                      Set automated rules to round up everyday payments to the nearest 10 KSh and deposit the spare change into high-yield 8.5% vault buckets.
                    </p>
                    <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="p-2 bg-emerald-500/10 text-emerald-500 rounded">
                          <PiggyBank className="w-4 h-4" />
                        </span>
                        <div>
                          <div className="text-[10px] text-slate-400 font-mono">My High-Yield Vault</div>
                          <div className="text-white text-base font-mono font-bold">350,000 KSh</div>
                        </div>
                      </div>
                      <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded font-bold font-mono">+8.5% APY</span>
                    </div>
                  </div>
                )}

                {activeShowcaseTab === 'insights' && (
                  <div className="p-5 rounded-xl border border-dashed border-emerald-500/20 bg-emerald-500/[0.02] space-y-4 text-left">
                    <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">AI Analytics Engine</span>
                    <h4 className="font-display font-medium text-xl text-navy-900 dark:text-white">Smart Expense Insights</h4>
                    <p className="text-sm text-navy-600 dark:text-slate-400">
                      Our machine learning system categorizes spending vectors automatically, warning of anomalous subscriptions or budget overshoots.
                    </p>
                    <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 text-left">
                      <div className="text-[10px] text-slate-400 font-mono uppercase mb-2">Category Allocations</div>
                      <div className="w-full bg-navy-900 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[45%]" title="Rent & Business"></div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 font-mono">
                        <span>Agribusiness: 45%</span>
                        <span>Remittances: 25%</span>
                        <span>Utility bills: 15%</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Showcase right copy details */}
              <div className="lg:col-span-6 space-y-5 text-left lg:pl-6">
                <h3 className="font-display font-medium text-2xl text-navy-900 dark:text-white">
                  Highly secure, localized, and ultra-reliable
                </h3>
                <p className={`text-sm md:text-base ${isDarkMode ? 'text-slate-400' : 'text-navy-600'} leading-relaxed`}>
                  PayFlow handles the complex technical routing beneath the surface, ensuring that your digital funds settle in real-time, whether paying a supplier in Nairobi or receiving a wire transfer from the US.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-navy-700 dark:text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Real-time local currency clearance with all major banks</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-navy-700 dark:text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Zero delayed processing and absolutely no hidden conversion rates</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-navy-700 dark:text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Compliance-approved security aligned with global & regional guidelines</span>
                  </li>
                </ul>

                <div className="pt-4">
                  <button 
                    onClick={() => setShowAccountModal(true)}
                    className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-emerald-500 hover:gap-2.5 transition-all cursor-pointer"
                  >
                    Explore our detailed product documentation <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 6. Why Choose PayFlow */}
      <section className="py-20 border-b border-slate-200/10">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-500 font-display text-xs font-semibold uppercase tracking-wider block mb-2">
              Why Choose PayFlow
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4 text-navy-900 dark:text-white">
              Smarter financial technology designed for growth
            </h2>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-navy-600'} text-lg`}>
              We prioritize institutional compliance, military-grade protection, and speed above all else.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Benefit Card 1 */}
            <div className={`p-6 rounded-2xl border text-center transition-all hover:scale-[1.01] ${
              isDarkMode ? 'bg-navy-900/45 border-navy-850' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-5 h-5" />
              </span>
              <h4 className="font-display font-semibold text-base mb-2 text-navy-900 dark:text-white">Bank-Level Security</h4>
              <p className="text-xs text-navy-600 dark:text-slate-400 leading-relaxed">
                Military-grade AES-256 end-to-end encryption, multi-factor authorization, and biometrics.
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div className={`p-6 rounded-2xl border text-center transition-all hover:scale-[1.01] ${
              isDarkMode ? 'bg-navy-900/45 border-navy-850' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-5 h-5" />
              </span>
              <h4 className="font-display font-semibold text-base mb-2 text-navy-900 dark:text-white">Instant Transactions</h4>
              <p className="text-xs text-navy-600 dark:text-slate-400 leading-relaxed">
                Zero delayed processing. Move funds to and from M-Pesa or local bank clearing accounts instantly.
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div className={`p-6 rounded-2xl border text-center transition-all hover:scale-[1.01] ${
              isDarkMode ? 'bg-navy-900/45 border-navy-850' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                <Percent className="w-5 h-5" />
              </span>
              <h4 className="font-display font-semibold text-base mb-2 text-navy-900 dark:text-white">No Hidden Fees</h4>
              <p className="text-xs text-navy-600 dark:text-slate-400 leading-relaxed">
                Complete transparency. Zero account maintenance, balance, or monthly ledger charges.
              </p>
            </div>

            {/* Benefit Card 4 */}
            <div className={`p-6 rounded-2xl border text-center transition-all hover:scale-[1.01] ${
              isDarkMode ? 'bg-navy-900/45 border-navy-850' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-5 h-5" />
              </span>
              <h4 className="font-display font-semibold text-base mb-2 text-navy-900 dark:text-white">Global Payments</h4>
              <p className="text-xs text-navy-600 dark:text-slate-400 leading-relaxed">
                Receive international wire transfers, issue multi-currency bills, and generate secure virtual debit cards instantly.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Banking Statistics with Animated Counters */}
      <section className="py-16 md:py-24 border-b border-slate-200/10 bg-navy-900 text-white relative overflow-hidden">
        {/* Decorative backdrop mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#10B981,transparent_45%)] opacity-[0.03]"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <span className="font-mono text-3xl md:text-5xl font-extrabold text-white block">
                $12B+
              </span>
              <span className="text-xs md:text-sm text-slate-300 font-display uppercase tracking-wider block">
                Processed Annually
              </span>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-3xl md:text-5xl font-extrabold text-emerald-500 block">
                2M+
              </span>
              <span className="text-xs md:text-sm text-slate-300 font-display uppercase tracking-wider block">
                Active Users
              </span>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-3xl md:text-5xl font-extrabold text-white block">
                150+
              </span>
              <span className="text-xs md:text-sm text-slate-300 font-display uppercase tracking-wider block">
                Countries Supported
              </span>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-3xl md:text-5xl font-extrabold text-emerald-500 block">
                99.99%
              </span>
              <span className="text-xs md:text-sm text-slate-300 font-display uppercase tracking-wider block">
                Clearing Uptime
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Security Section */}
      <section id="security" className="py-20 border-b border-slate-200/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left copy security features */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-emerald-500 font-display text-xs font-semibold uppercase tracking-wider block">
                Bank-Level Protection
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-navy-900 dark:text-white">
                Military-grade security protocols safeguarding every shilling
              </h2>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-slate-400' : 'text-navy-600'} leading-relaxed`}>
                We prioritize user defense metrics over everything. PayFlow features multi-layered encryption keys, biometric verification patterns, and AI transaction audit filters.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0">
                    <Shield className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-navy-900 dark:text-white">End-to-End Encryption</h4>
                    <p className="text-xs text-navy-600 dark:text-slate-400">All transactional data and user keys are protected via AES-256 encryption.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0">
                    <Fingerprint className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-navy-900 dark:text-white">Biometric Login Security</h4>
                    <p className="text-xs text-navy-600 dark:text-slate-400">Access your digital wallet securely using facial verification or Touch ID biometric patterns.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0">
                    <ShieldAlert className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-navy-900 dark:text-white">Active AI Fraud Detection</h4>
                    <p className="text-xs text-navy-600 dark:text-slate-400">Our real-time neural monitors immediately lock accounts upon detecting anomalous transfers.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right security illustration built with HTML/CSS */}
            <div className="lg:col-span-6 flex justify-center">
              <div className={`w-full max-w-md rounded-2xl border p-8 text-center transition-colors relative ${
                isDarkMode ? 'bg-navy-900 border-navy-800' : 'bg-slate-50 border-slate-200'
              }`}>
                {/* Decorative circle shield */}
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-dashed border-emerald-500 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-12 h-12 text-emerald-500" />
                </div>
                
                <h3 className="font-display font-semibold text-lg text-navy-900 dark:text-white mb-2">Central Bank of Kenya Compliant</h3>
                <p className="text-xs text-navy-600 dark:text-slate-400 leading-relaxed mb-6">
                  PayFlow processes and safeguards funds in compliance with regional central bank regulations and global trust indicators.
                </p>

                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className={`p-3 rounded-lg border text-[10px] font-mono font-bold uppercase tracking-wider ${
                    isDarkMode ? 'bg-navy-950 border-navy-800' : 'bg-white border-slate-200'
                  }`}>
                    <CheckSquare className="w-4.5 h-4.5 text-emerald-500 inline-block mr-1" />
                    PCI-DSS Level 1
                  </div>
                  <div className={`p-3 rounded-lg border text-[10px] font-mono font-bold uppercase tracking-wider ${
                    isDarkMode ? 'bg-navy-950 border-navy-800' : 'bg-white border-slate-200'
                  }`}>
                    <CheckSquare className="w-4.5 h-4.5 text-emerald-500 inline-block mr-1" />
                    2FA / MFA Enabled
                  </div>
                  <div className={`p-3 rounded-lg border text-[10px] font-mono font-bold uppercase tracking-wider ${
                    isDarkMode ? 'bg-navy-950 border-navy-800' : 'bg-white border-slate-200'
                  }`}>
                    <CheckSquare className="w-4.5 h-4.5 text-emerald-500 inline-block mr-1" />
                    AML/KYC Compliant
                  </div>
                  <div className={`p-3 rounded-lg border text-[10px] font-mono font-bold uppercase tracking-wider ${
                    isDarkMode ? 'bg-navy-950 border-navy-800' : 'bg-white border-slate-200'
                  }`}>
                    <CheckSquare className="w-4.5 h-4.5 text-emerald-500 inline-block mr-1" />
                    GDPR Shielded
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Customer Testimonials */}
      <section className={`py-20 border-b transition-colors ${
        isDarkMode ? 'bg-navy-950 border-navy-850' : 'bg-slate-50/50 border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-500 font-display text-xs font-semibold uppercase tracking-wider block mb-2">
              Customer Reviews
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4 text-navy-900 dark:text-white">
              Trusted by tech leaders and retail traders
            </h2>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-navy-600'} text-lg`}>
              Read how PayFlow helps Kenyan businesses and individuals execute seamless cross-border transfers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className={`p-6 rounded-2xl border transition-all hover:shadow-md text-left ${
              isDarkMode ? 'bg-navy-900 border-navy-800' : 'bg-white border-slate-250 shadow-sm'
            }`}>
              <div className="flex items-center gap-1 text-emerald-500 mb-4">
                {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-emerald-500 stroke-none" />)}
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-navy-700'} mb-6 leading-relaxed italic`}>
                &quot;Using PayFlow has completely changed how we handle invoice payouts at Kesho Capital. We remit salary advances and clear bills directly to our employees&apos; M-Pesa wallets across Nairobi and Mombasa in under 5 seconds. The transparency in exchange rates is phenomenal.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold font-display flex items-center justify-center text-sm">
                  EK
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-navy-900 dark:text-white">Emmanuel Kiprop</h4>
                  <p className="text-[10px] text-navy-600 dark:text-slate-400">Operations Director, Kesho Capital (Nairobi)</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className={`p-6 rounded-2xl border transition-all hover:shadow-md text-left ${
              isDarkMode ? 'bg-navy-900 border-navy-800' : 'bg-white border-slate-250 shadow-sm'
            }`}>
              <div className="flex items-center gap-1 text-emerald-500 mb-4">
                {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-emerald-500 stroke-none" />)}
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-navy-700'} mb-6 leading-relaxed italic`}>
                &quot;The high-yield vaults are a game changer. I earn a steady compound APY of 8.5% on my spare balance. Being based in Eldoret, having instantaneous access to KES withdrawals and direct bank links makes PayFlow my primary digital wallet. Truly unpolished-free engineering.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold font-display flex items-center justify-center text-sm">
                  AW
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-navy-900 dark:text-white">Aminah Wanjiku</h4>
                  <p className="text-[10px] text-navy-600 dark:text-slate-400">Independent Consultant (Eldoret)</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className={`p-6 rounded-2xl border transition-all hover:shadow-md text-left ${
              isDarkMode ? 'bg-navy-900 border-navy-800' : 'bg-white border-slate-250 shadow-sm'
            }`}>
              <div className="flex items-center gap-1 text-emerald-500 mb-4">
                {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-emerald-500 stroke-none" />)}
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-navy-700'} mb-6 leading-relaxed italic`}>
                &quot;Generating multi-currency virtual debit cards allows our logistics team in Mombasa to pay for global SaaS tools and harbor tracking portals in USD without carrying high conversion markup fees. The security dashboards give us ultimate peace of mind.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold font-display flex items-center justify-center text-sm">
                  OM
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-navy-900 dark:text-white">Otieno Mwangi</h4>
                  <p className="text-[10px] text-navy-600 dark:text-slate-400">Logistics Manager, Portpoint East Africa (Mombasa)</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 10. Pricing Plans */}
      <section className="py-20 border-b border-slate-200/10">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-emerald-500 font-display text-xs font-semibold uppercase tracking-wider block mb-2">
              Flexible Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4 text-navy-900 dark:text-white">
              Transparent options for individuals and enterprises
            </h2>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-navy-600'} text-lg`}>
              Choose the perfect plan suited for your transactional requirements. Zero lock-in contracts or maintenance fees.
            </p>

            {/* Toggle Monthly / Annual */}
            <div className="inline-flex rounded-xl p-0.5 border border-slate-200 dark:border-navy-800 bg-slate-500/5 mt-8 items-center gap-2">
              <button
                onClick={() => setPricingInterval('monthly')}
                className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                  pricingInterval === 'monthly'
                    ? 'bg-navy-900 text-white dark:bg-emerald-500 dark:text-navy-950 shadow'
                    : 'text-navy-600 dark:text-slate-400'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setPricingInterval('annual')}
                className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                  pricingInterval === 'annual'
                    ? 'bg-navy-900 text-white dark:bg-emerald-500 dark:text-navy-950 shadow'
                    : 'text-navy-600 dark:text-slate-400'
                }`}
              >
                Annual Billing (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* Plan 1 - Personal */}
            <div className={`p-8 rounded-2xl border flex flex-col justify-between text-left transition-all hover:scale-[1.01] ${
              isDarkMode ? 'bg-navy-900/40 border-navy-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div>
                <h4 className="font-display font-semibold text-lg text-navy-900 dark:text-white mb-1">Personal Account</h4>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-navy-600'} mb-6`}>Excellent for general money transfers & budgeting.</p>
                <div className="mb-6">
                  <span className="font-mono text-4xl font-extrabold text-navy-900 dark:text-white">Free</span>
                  <span className="text-xs text-navy-600 dark:text-slate-400"> / forever</span>
                </div>
                <div className="w-full h-px bg-slate-200 dark:bg-navy-800 mb-6"></div>
                <ul className="space-y-3 text-xs text-navy-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Free transfers between PayFlow users</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>1 multi-currency virtual Visa card</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Access to 8.5% APY savings vaults</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                    <X className="w-4 h-4 shrink-0" />
                    <span>No commercial API integrations</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setShowAccountModal(true)}
                className="w-full mt-8 py-3 rounded-xl border border-emerald-500 text-emerald-500 hover:bg-emerald-500/5 font-semibold text-center text-sm transition-all cursor-pointer"
              >
                Sign Up Free
              </button>
            </div>

            {/* Plan 2 - Business (HIGHLIGHTED) */}
            <div className={`p-8 rounded-2xl border-2 border-emerald-500 flex flex-col justify-between text-left transition-all hover:scale-[1.02] relative ${
              isDarkMode ? 'bg-navy-950 text-white' : 'bg-white shadow-xl shadow-slate-200/60'
            }`}>
              <span className="absolute top-4 right-4 bg-emerald-500 text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
                Recommended
              </span>
              <div>
                <h4 className="font-display font-semibold text-lg text-navy-900 dark:text-white mb-1">Business Core</h4>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-navy-600'} mb-6`}>For modern Kenyan businesses & digital freelancers.</p>
                <div className="mb-6">
                  <span className="font-mono text-4xl font-extrabold text-navy-900 dark:text-white">
                    {pricingInterval === 'monthly' ? formatVal(9.99) : formatVal(7.99)}
                  </span>
                  <span className="text-xs text-navy-600 dark:text-slate-400"> / month</span>
                </div>
                <div className="w-full h-px bg-slate-200 dark:bg-navy-800 mb-6"></div>
                <ul className="space-y-3 text-xs text-navy-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Unlimited virtual cards for your team</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Custom REST API payment gateways</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Commercial bulk invoicing & mass payouts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Dedicated account support specialist</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setShowAccountModal(true)}
                className="w-full mt-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-center text-sm transition-all cursor-pointer"
              >
                Get Started
              </button>
            </div>

            {/* Plan 3 - Enterprise */}
            <div className={`p-8 rounded-2xl border flex flex-col justify-between text-left transition-all hover:scale-[1.01] ${
              isDarkMode ? 'bg-navy-900/40 border-navy-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div>
                <h4 className="font-display font-semibold text-lg text-navy-900 dark:text-white mb-1">Enterprise Pipeline</h4>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-navy-600'} mb-6`}>For high-volume corporations & logistic clearing hubs.</p>
                <div className="mb-6">
                  <span className="font-mono text-3xl font-extrabold text-navy-900 dark:text-white">Custom</span>
                  <span className="text-xs text-navy-600 dark:text-slate-400"> / volume based</span>
                </div>
                <div className="w-full h-px bg-slate-200 dark:bg-navy-800 mb-6"></div>
                <ul className="space-y-3 text-xs text-navy-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Fully dedicated physical settlement lines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>CBK audits & customized escrow workflows</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Lowest volume clearing fees (under 0.05%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>24/7 dedicated physical engineers</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setShowAccountModal(true)}
                className="w-full mt-8 py-3 rounded-xl border border-slate-300 dark:border-navy-700 hover:bg-slate-500/5 font-semibold text-center text-sm transition-all cursor-pointer"
              >
                Contact Sales
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Localized county map presence & calculators */}
      <CitySelector isDarkMode={isDarkMode} />

      {/* Interactive Savings/Exchange rate calculators */}
      <Calculator currency={currency} isDarkMode={isDarkMode} />

      {/* FAQ Accordion component */}
      <FAQ isDarkMode={isDarkMode} />

      {/* 12. Download the App Promo */}
      <section className={`py-20 border-b transition-colors ${
        isDarkMode ? 'bg-navy-950 border-navy-850' : 'bg-slate-50/50 border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left copy app promo */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-emerald-500 font-display text-xs font-semibold uppercase tracking-wider block">
                Take Control Anywhere
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-navy-900 dark:text-white">
                Download the secure PayFlow mobile wallet
              </h2>
              <p className={`text-sm md:text-base ${isDarkMode ? 'text-slate-400' : 'text-navy-600'} leading-relaxed`}>
                Settle bills on the go. Generate virtual cards, perform instant bank wire payouts, and review expense categories from any location across all 47 Kenyan counties.
              </p>

              <div className="space-y-3 text-sm text-navy-700 dark:text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                  <span>Available on iOS App Store & Google Play Store</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                  <span>Real-time SMS alerts and transaction logging</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                  <span>Secure local biometric logins</span>
                </div>
              </div>

              {/* Fake app store buttons built using HTML/CSS */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => alert('Download starting from Apple App Store...')}
                  className="px-5 py-3 bg-navy-900 text-white rounded-xl flex items-center gap-3 border border-navy-800 transition-all hover:scale-[1.01] text-left cursor-pointer"
                >
                  <Smartphone className="w-6 h-6 text-emerald-500" />
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 block font-mono">Download on the</span>
                    <span className="text-xs font-bold font-display">App Store</span>
                  </div>
                </button>

                <button 
                  onClick={() => alert('Download starting from Google Play Store...')}
                  className="px-5 py-3 bg-navy-900 text-white rounded-xl flex items-center gap-3 border border-navy-800 transition-all hover:scale-[1.01] text-left cursor-pointer"
                >
                  <Smartphone className="w-6 h-6 text-emerald-500" />
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 block font-mono">Get it on</span>
                    <span className="text-xs font-bold font-display">Google Play</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Phone Mockup and QR code placeholder */}
            <div className="lg:col-span-6 flex flex-col md:flex-row items-center justify-center gap-8">
              
              {/* HTML/CSS Phone Mockup */}
              <div className="w-64 h-[460px] rounded-[36px] border-8 border-navy-900 bg-navy-950 overflow-hidden relative shadow-2xl flex flex-col justify-between p-4">
                {/* Speaker pill */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-navy-900 rounded-full"></div>
                
                <div className="pt-4 flex flex-col justify-between h-full">
                  {/* Top Bar inside app */}
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                    <span>PayFlow</span>
                    <span>10:42 AM</span>
                  </div>

                  {/* Body inside app */}
                  <div className="my-auto space-y-4 text-left">
                    <div className="p-3 bg-navy-900 border border-navy-800 rounded-xl space-y-1">
                      <span className="text-[9px] uppercase text-slate-400 font-mono">Available Balance</span>
                      <div className="text-emerald-500 text-xl font-mono font-bold">{currency === 'USD' ? '$12,450' : '1.6M KSh'}</div>
                    </div>

                    <div className="p-3 bg-navy-900 border border-navy-800 rounded-xl space-y-1">
                      <span className="text-[9px] text-slate-400 font-mono uppercase block">Debit VISA</span>
                      <span className="text-white text-xs font-mono tracking-widest block">••••  ••••  ••••  7721</span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] text-slate-400 font-mono uppercase">Quick pay:</span>
                      <div className="p-2 rounded bg-navy-900 border border-navy-800 text-[10px] flex justify-between items-center text-white">
                        <span>M-Pesa cash-out</span>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                    </div>
                  </div>

                  {/* Simulated iOS home bar */}
                  <div className="w-24 h-1.5 bg-slate-700 rounded-full mx-auto mt-2"></div>
                </div>
              </div>

              {/* QR Code component */}
              <div className={`p-6 rounded-2xl border text-center max-w-[200px] transition-colors ${
                isDarkMode ? 'bg-navy-900 border-navy-800' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div className="w-32 h-32 bg-slate-150 rounded-xl flex items-center justify-center border border-slate-200/20 mx-auto mb-4">
                  <QrCode className="w-20 h-20 text-navy-900 dark:text-emerald-500" />
                </div>
                <h4 className="font-display font-semibold text-xs text-navy-900 dark:text-white mb-1">Scan to Download</h4>
                <p className="text-[10px] text-navy-600 dark:text-slate-400">Instantly activate your digital account.</p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 13. Final CTA conversion banner */}
      <section className="py-20 md:py-28 bg-navy-900 text-white relative overflow-hidden text-center border-b border-slate-200/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,#10B981,transparent_50%)] opacity-[0.04]"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight">
            Take full control of your digital payments today
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Open your secure, Central Bank compliant digital wallet instantly. Remit funds locally, save with APY, and grow your commercial assets.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-4">
            <button 
              onClick={() => setShowAccountModal(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-full transition-all shadow-lg shadow-emerald-500/10 text-center flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Open Free Account <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setShowWatchDemo(true)}
              className="border border-slate-700 hover:bg-slate-850 text-slate-200 font-semibold px-8 py-4 rounded-full transition-all text-center cursor-pointer"
            >
              Talk to local experts
            </button>
          </div>

          <div className="pt-6 text-[10px] text-slate-400 font-mono uppercase tracking-wider">
            Zero commitment • Free Personal Tier • Fully Verified across Kenya
          </div>
        </div>
      </section>

      {/* 14. Footer */}
      <footer className={`py-16 transition-colors duration-300 border-t ${
        isDarkMode ? 'bg-navy-950 border-navy-850 text-slate-300' : 'bg-slate-50 border-slate-200 text-navy-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          
          {/* Logo column (4 cols) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <a href="#" className="flex items-center gap-2 font-display font-bold text-xl text-navy-900 dark:text-white">
              <span className="p-1.5 bg-emerald-500 text-white rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </span>
              <span>Pay<span className="text-emerald-500">Flow</span></span>
            </a>
            <p className="text-xs text-navy-600 dark:text-slate-400 leading-relaxed">
              PayFlow is a cutting-edge fictional digital banking and commercial payment infrastructure platform, integrated natively across Kenyan mobile clearing gateways and international settlement networks.
            </p>
            <div className="text-[10px] text-navy-600 dark:text-slate-400 leading-relaxed">
              <span className="font-semibold text-emerald-500 block mb-0.5">Central Bank Regulatory Note:</span>
              Compliant with the Central Bank of Kenya financial licensing rules. Customer reserves are secured at trusted regional trust hubs.
            </div>
          </div>

          {/* Nav column 1 (2 cols) */}
          <div className="lg:col-span-2 space-y-3 text-left">
            <h5 className="text-xs font-bold uppercase tracking-widest text-navy-900 dark:text-white font-display">Products</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-emerald-500">Personal wallets</a></li>
              <li><a href="#features" className="hover:text-emerald-500">Business payments</a></li>
              <li><a href="#features" className="hover:text-emerald-500">Virtual debit Visa</a></li>
              <li><a href="#pricing-calculator" className="hover:text-emerald-500">High APY savings</a></li>
            </ul>
          </div>

          {/* Nav column 2 (2 cols) */}
          <div className="lg:col-span-2 space-y-3 text-left">
            <h5 className="text-xs font-bold uppercase tracking-widest text-navy-900 dark:text-white font-display">Regional Nodes</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#kenyan-cities" className="hover:text-emerald-500">Nairobi CBD</a></li>
              <li><a href="#kenyan-cities" className="hover:text-emerald-500">Mombasa Marina</a></li>
              <li><a href="#kenyan-cities" className="hover:text-emerald-500">Kisumu Lakeside</a></li>
              <li><a href="#kenyan-cities" className="hover:text-emerald-500">Nakuru Valley</a></li>
              <li><a href="#kenyan-cities" className="hover:text-emerald-500">Eldoret Hub</a></li>
            </ul>
          </div>

          {/* Newsletter Signup (4 cols) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <h5 className="text-xs font-bold uppercase tracking-widest text-navy-900 dark:text-white font-display">Newsletter Signup</h5>
            <p className="text-xs text-navy-600 dark:text-slate-400">Receive regulatory, fee, and APY rate updates directly in your inbox.</p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className={`flex-1 text-xs p-2.5 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-navy-900 border-navy-800 text-white' 
                    : 'bg-white border-slate-200 text-navy-900'
                }`}
              />
              <button
                type="submit"
                className="bg-[#001B44] dark:bg-emerald-500 hover:bg-opacity-90 dark:hover:bg-emerald-600 text-white dark:text-navy-950 text-xs font-semibold px-6 py-2.5 rounded-full transition-all shadow-md"
              >
                Subscribe
              </button>
            </form>

            {newsletterSubscribed && (
              <div className="text-[10px] text-emerald-500 flex items-center gap-1 font-bold font-mono">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Subscription successful. Thank you!</span>
              </div>
            )}
          </div>

        </div>

        {/* Footer bottom social / links / metadata */}
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-200/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-navy-600 dark:text-slate-500">
          <div>
            &copy; 2026 PayFlow Inc. All rights reserved. Designed professionally for portfolios.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-emerald-500">Security Guidelines</a>
            <a href="#" className="hover:text-emerald-500">Privacy & Terms</a>
            <a href="#" className="hover:text-emerald-500">CBK Disclosures</a>
            <a href="#" className="hover:text-emerald-500">Status Node</a>
          </div>
        </div>
      </footer>

      {/* Floating support chat widget (FlowAI Gemini powered) */}
      <ChatWidget isDarkMode={isDarkMode} />

      {/* Interactive Sticky mobile CTA bar */}
      {showStickyCta && (
        <div className={`fixed bottom-0 left-0 right-0 z-30 p-3 lg:hidden flex items-center justify-between border-t transition-colors ${
          isDarkMode ? 'bg-navy-950/95 border-navy-800 text-white' : 'bg-white/95 border-slate-200 text-navy-900'
        } backdrop-blur-md`}>
          <div className="text-left pl-2">
            <span className="text-[9px] uppercase tracking-wider text-emerald-600 block">Yield APY vault</span>
            <span className="font-mono text-sm font-extrabold">8.5% APY</span>
          </div>
          <button 
            onClick={() => setShowAccountModal(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition-all shadow-md shadow-emerald-500/15"
          >
            Create Account
          </button>
        </div>
      )}

      {/* Modal Dialog: Watch Demo Walkthrough */}
      {showWatchDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-lg rounded-2xl border p-6 text-left relative ${
            isDarkMode ? 'bg-navy-950 border-navy-800 text-white' : 'bg-white border-slate-200 text-navy-900'
          }`}>
            <button 
              onClick={() => setShowWatchDemo(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-semibold text-xl mb-4">Request Demo Environment</h3>
            <p className="text-xs text-navy-600 dark:text-slate-400 mb-6 leading-relaxed">
              Register to receive a simulated private staging invitation with test tokens to explore the REST API payment clearing tunnels.
            </p>
            <form onSubmit={handleDemoSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold block mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  className={`w-full text-xs p-2.5 rounded-lg border ${
                    isDarkMode ? 'bg-navy-900 border-navy-800 text-white' : 'bg-white border-slate-200'
                  }`} 
                />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1">Business Email</label>
                <input 
                  type="email" 
                  required 
                  className={`w-full text-xs p-2.5 rounded-lg border ${
                    isDarkMode ? 'bg-navy-900 border-navy-800 text-white' : 'bg-white border-slate-200'
                  }`} 
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full text-center text-xs transition-all shadow-md"
              >
                Register Demo Wallet
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Dialog: Open Account Signup Welcome */}
      {showAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-2xl border p-6 text-left relative ${
            isDarkMode ? 'bg-navy-950 border-navy-800 text-white' : 'bg-white border-slate-200 text-navy-900'
          }`}>
            <button 
              onClick={() => setShowAccountModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-semibold text-xl mb-2">Create Your Digital Sandbox Account</h3>
            <p className="text-xs text-navy-600 dark:text-slate-400 mb-6 leading-relaxed">
              Verification takes under 3 minutes. Have your National ID or Passport ready.
            </p>
            <div className="space-y-4">
              <button 
                onClick={() => { setShowAccountModal(false); alert('Redirecting to secure biometric partner portal...'); }}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full text-center text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                Verify instantly using Kenyan National ID / Passport
              </button>
              
              <div className="text-center text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                Or choose alternate option
              </div>

              <button 
                onClick={() => { setShowAccountModal(false); alert('Starting standard registration...'); }}
                className={`w-full py-3 font-semibold rounded-full text-center text-xs transition-all border ${
                  isDarkMode 
                    ? 'border-navy-800 hover:bg-navy-900 text-slate-300' 
                    : 'border-slate-200 hover:bg-slate-50 text-navy-800'
                }`}
              >
                Register standard business or personal account
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
