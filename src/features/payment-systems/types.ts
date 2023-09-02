export type PaymentSystem = {
  id: string; // delete string
  name: string;
  symbol: string;
  type: 'fiat' | 'crypto';
  course: string;
  reserve: string;
  disabled?: boolean;
  logoPrefix: string;
  logoActivePrefix?: string;
  min: string;
  max: string;
};

