import { store } from './app/store';
import { fetchSourceMethods } from './features/payment-systems/paymentSystemsSlise';
export function initApp() {
  return Promise.all([store.dispatch(fetchSourceMethods())]);
}
