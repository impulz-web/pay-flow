export type Currency = 'USD' | 'KES';

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
  amount: number;
  currency: Currency;
  merchant: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
  city?: string;
}

export interface KenyanCity {
  name: string;
  county: string;
  speedMs: number;
  partners: string[];
  merchantsCount: number;
  remittanceRate: number;
  popularProduct: string;
}
