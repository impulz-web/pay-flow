'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Opening an Account',
    question: 'How do I open a free PayFlow account in Kenya?',
    answer: 'Opening a PayFlow account is 100% digital and takes under 3 minutes. Download the application or click Open Free Account. You will need your Kenyan National ID or Passport, and a registered phone number. Verification is instant via our integrated biometric system, and your multi-currency wallets are generated immediately.',
  },
  {
    category: 'Fees',
    question: 'Are there any hidden fees or transactional markups?',
    answer: 'None whatsoever. PayFlow operates on transparent, simple pricing. Our Personal tier is entirely free, with zero maintenance, ledger, or balance fees. Moving funds between PayFlow users is completely free. Remittance transactions, bank settlements, and M-Pesa payouts carry a clear flat-rate processing charge ranging from 0.1% to 0.15% with absolutely no hidden conversion spreads.',
  },
  {
    category: 'Security',
    question: 'How secure is PayFlow and are my funds regulated?',
    answer: 'PayFlow maintains military-grade security. All personal data and transaction payloads are secured with end-to-end AES-256 encryption. We support Multi-Factor Authentication (MFA), face/fingerprint biometric authentication, and active AI fraud detection. Financially, PayFlow holds all customer reserves in highly secure, fully regulated trust accounts managed in cooperation with the Central Bank of Kenya guidelines.',
  },
  {
    category: 'International Transfers',
    question: 'How do international transfers and USD/KES conversions work?',
    answer: 'PayFlow provides multi-currency wallets (such as USD, KES, EUR, GBP). You can swap between currencies instantly at the absolute mid-market institutional exchange rate with zero spread margins. International inward wire or card remittances settle instantly into your USD wallet, and you can withdraw to local Kenyan bank accounts or mobile money (M-Pesa, Airtel Money) in under 10 seconds.',
  },
  {
    category: 'Cards',
    question: 'Can I generate virtual debit cards and are they accepted globally?',
    answer: 'Yes! You can instantly generate virtual multi-currency debit cards directly from your mobile dashboard. These cards are secured by international card networks and accepted globally at millions of online platforms, streaming services, and merchant checkouts. You can toggle limits, freeze/unfreeze cards instantly, and configure secondary PINs for optimal security.',
  },
  {
    category: 'Business Accounts',
    question: 'What advanced payment features do Business and Enterprise plans offer?',
    answer: 'PayFlow Business (999 KSh/month) unlocks powerful commercial invoicing, multi-user access permissions, mass salary disbursements, and custom REST API integrations for real-time payments. PayFlow Enterprise offers tailored transaction processing pipelines, dedicated dedicated physical gateways, CBK-audited financial compliance, and high-volume discount clearing rates.',
  },
  {
    category: 'Investments',
    question: 'What high-yield savings options and investment tools are available?',
    answer: 'PayFlow features integrated high-yield savings vaults. You can configure automated "round-ups" on daily purchases or allocate automatic monthly sweeps into your vault to earn up to 8.5% annual compound yield. Additionally, users can directly invest in global assets and government treasury bonds directly from their investment wallet.',
  },
  {
    category: 'Customer Support',
    question: 'How do I access customer support across different Kenyan towns?',
    answer: 'Our customer support team is available 24/7. You can access the live chat widget directly in the mobile app, or contact our support desks in major town offices including Nairobi, Mombasa, Kisumu, and Eldoret. You can also utilize FlowAI, our real-time smart assistant, for instantaneous support queries, transactional checks, and account guidelines.',
  },
];

interface FAQProps {
  isDarkMode: boolean;
}

export default function FAQ({ isDarkMode }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={`py-20 border-b transition-colors duration-300 ${
      isDarkMode ? 'bg-navy-900 border-navy-800 text-slate-100' : 'bg-navy-50/30 border-slate-100 text-navy-900'
    }`}>
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-500 font-display text-xs font-semibold uppercase tracking-wider block mb-2">
            Clear Answers
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4 text-navy-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className={`${isDarkMode ? 'text-slate-400' : 'text-navy-600'} text-lg`}>
            Everything you need to know about setting up your digital banking and payment pipelines with PayFlow.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen 
                    ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10' 
                    : isDarkMode 
                      ? 'border-navy-800 bg-navy-950 hover:border-navy-700' 
                      : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-display font-medium"
                >
                  <div className="flex items-center gap-3">
                    <span className={`p-1.5 rounded-lg shrink-0 ${
                      isOpen ? 'bg-emerald-500/15 text-emerald-500' : 'bg-slate-500/10 text-slate-400'
                    }`}>
                      <HelpCircle className="w-4 h-4" />
                    </span>
                    <span className="text-sm md:text-base font-semibold text-navy-900 dark:text-white">
                      {item.question}
                    </span>
                  </div>
                  <span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </span>
                </button>

                {/* Answer block */}
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-[500px] border-t border-slate-200/20' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 text-sm leading-relaxed text-navy-600 dark:text-slate-300 bg-slate-500/5">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-500 mb-1">
                      Category: {item.category}
                    </div>
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
