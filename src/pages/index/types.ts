export type PaymentDetails = {
  amount: string;
  currency: string;
}

export type Transaction = {
  id: string;
  source: PaymentDetails;
  target: PaymentDetails;
  time: string;
}
