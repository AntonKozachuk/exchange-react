import { PaymentDetails } from '../../pages/index/types';

export type Transaction = {
  id: string;
  source: PaymentDetails;
  target: PaymentDetails;
  time: string;
}
