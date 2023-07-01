export type PaymentSystem = {
  id: string;
  name: string;
  type: 'fiat' | 'crypto';
  course: string;
  reserve: string;
  disabled?: boolean;
  logoPrefix: string;
};

