import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PayFlow – FinTech Digital Banking and Payments in Kenya',
  description: 'Experience bank-level security, instant money transfers, custom virtual debit cards, and seamless local bank & M-Pesa integrations across Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and all major cities in Kenya. Open your free PayFlow account today.',
  keywords: [
    'PayFlow Kenya',
    'Digital Banking Kenya',
    'Mobile Banking Nairobi',
    'Remittance Kisumu',
    'M-Pesa bank transfer',
    'Mombasa FinTech',
    'Nakuru smart budgeting',
    'Eldoret virtual card',
    'Kenya digital payment platform',
    'Central Bank of Kenya compliant',
    'Naivasha mobile payments',
    'Malindi secure remittance',
    'Kitale agricultural banking',
    'Nyeri business payouts',
    'Machakos finance wallet',
    'Meru money transfers',
    'Kakamega digital savings',
    'Garissa trade clearing',
    'Kericho corporate transactions',
    'Kisii SME invoicing',
    'Athi River industrial finance'
  ],
  openGraph: {
    title: 'PayFlow – Smarter Digital Banking For Kenya and Globally',
    description: 'Instant local transfers, secure multi-currency virtual cards, and smart automated budgeting across Nairobi, Mombasa, Kisumu, and all Kenyan cities.',
    type: 'website',
    locale: 'en_KE',
    siteName: 'PayFlow Kenya',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-white text-navy-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
