import { PaymentSystem } from './types';
// [...$0.querySelectorAll('.select-direction-item')].map((el) => {
//   return {
//     logoPrefix: el.querySelector('img').getAttribute('src'),
//     name: el.querySelector('[translate-module="currencies"]').innerText.trim(),
//     id: el.querySelector('[translate-module="currencies"]').innerText.trim().replace(/\s/g, '-'),
//     course: el.querySelector('.info').innerText
//   };
// })
const paymentSystems: PaymentSystem[] = [
  {
    logoPrefix: "images/payment-systems/c-qiwi.svg",
    name: "Qiwi",
    id: "Qiwi",
    course: "80,5189",
    reserve: "8 млн",
    type: 'fiat',
  },
  {
    logoPrefix: "images/payment-systems/c-btc.svg",
    name: "Bitcoin",
    id: "Bitcoin",
    course: "31 184,5591",
    reserve: "7",
    type: 'crypto'
  },
  {
    logoPrefix: "images/payment-systems/c-sberbank.svg",
    name: "Сбербанк ₽",
    id: "Сбербанк-₽",
    course: "80,5928",
    reserve: "8 млн",
    type: 'fiat',
  },
  {
    logoPrefix: "images/payment-systems/c-tinkoff.svg",
    name: "Тинькофф ₽",
    id: "Тинькофф-₽",
    course: "80,4501",
    reserve: "8 млн",
    type: 'fiat',
  },
  {
    logoPrefix: "images/payment-systems/c-card.svg",
    name: "Visa, MC ₽",
    id: "Visa,-MC-₽",
    course: "80,4501",
    reserve: "8 млн",
    type: 'fiat',
  },
  {
    logoPrefix: "images/payment-systems/c-eth.svg",
    name: "Ethereum ETH",
    id: "Ethereum-ETH",
    course: "2 476,074",
    reserve: "27",
    type: 'crypto'
  },
  {
    logoPrefix: "images/payment-systems/c-ltc.svg",
    name: "Litecoin",
    id: "Litecoin",
    course: "97,1186",
    reserve: "44",
    type: 'crypto'
  },
  {
    logoPrefix: "images/payment-systems/c-usdt.svg",
    name: "Tether ERC20 (USDT)",
    id: "Tether-ERC20-(USDT)",
    course: "1,0049",
    reserve: "94 тыс",
    type: 'crypto'
  },
  {
    logoPrefix: "images/payment-systems/c-usdt.svg",
    name: "Tether BEP20 (USDT)",
    id: "Tether-BEP20-(USDT)",
    course: "1,0326",
    reserve: "49 тыс",
    type: 'crypto'
  },
  {
    logoPrefix: "images/payment-systems/c-pm.svg",
    name: "PerfectMoney $",
    id: "PerfectMoney-$",
    course: "1,0452",
    reserve: "7 тыс",
    type: 'fiat',
  },
  {
    logoPrefix: "images/payment-systems/c-tron-trx.svg",
    name: "Tron (TRX)",
    id: "Tron-(TRX)",
    course: "15,2219",
    reserve: "204 тыс",
    type: 'crypto'
  },
  {
    logoPrefix: "images/payment-systems/bnb.svg",
    name: "BinanceCoin BEP20",
    id: "BinanceCoin-BEP20",
    course: "334,4711",
    reserve: "339",
    type: 'crypto'
  },
  {
    logoPrefix: "images/payment-systems/c-alfa.svg",
    name: "Альфа-Клик ₽",
    id: "Альфа-Клик-₽",
    course: "80,5359",
    reserve: "8 млн",
    type: 'fiat',
  },
  {
    logoPrefix: "images/payment-systems/c-adv-cash.png",
    name: "Advanced Cash $",
    id: "Advanced-Cash-$",
    course: "1,0032",
    reserve: "14 тыс",
    type: 'fiat',
  },
  {
    logoPrefix: "images/payment-systems/c-pm.svg",
    name: "PerfectMoney €",
    id: "PerfectMoney-€",
    course: "1,0799",
    reserve: "0",
    type: 'fiat',
  },
  {
    logoPrefix: "images/payment-systems/c-doge.svg",
    name: "Dogecoin",
    id: "Dogecoin",
    course: "11,3603",
    reserve: "416 тыс",
    type: 'crypto'
  },
  {
    logoPrefix: "images/payment-systems/c-ripple.svg",
    name: "Ripple XRP",
    id: "Ripple-XRP",
    course: "1,928",
    reserve: "99 тыс",
    type: 'crypto'
  },
  {
    logoPrefix: "images/payment-systems/dai.svg",
    name: "DAI (ERC20)",
    id: "DAI-(ERC20)",
    course: "1,0116",
    reserve: "51 тыс",
    type: 'crypto'
  },
  {
    logoPrefix: "images/payment-systems/c-adv-cash.png",
    name: "Advanced Cash ₽",
    id: "Advanced-Cash-₽",
    course: "65,2022",
    reserve: "85 тыс",
    type: 'fiat',
  },
  {
    logoPrefix: "images/payment-systems/c-usdc.svg",
    name: "USD Coin ERC20 (USDC)",
    id: "USD-Coin-ERC20-(USDC)",
    course: "1,0063",
    reserve: "19 тыс",
    type: 'crypto'
  },
  {
    logoPrefix: "images/payment-systems/c-bch.png",
    name: "Bitcoin Cash",
    id: "Bitcoin-Cash",
    course: "133,2849",
    reserve: "88",
    type: 'crypto'
  },
  {
    logoPrefix: "images/payment-systems/c-promsvyaz.svg",
    name: "Промсвязьбанк",
    id: "Промсвязьбанк",
    course: "54,0346",
    reserve: "8 млн",
    type: 'fiat',
  },
  {
    logoPrefix: "images/payment-systems/polkadot.svg",
    name: "Polkadot",
    id: "Polkadot",
    course: "6,5856",
    reserve: "60",
    type: 'crypto'
  },
  {
    logoPrefix: "images/payment-systems/shiba.svg",
    name: "Shiba Inu (SHIB ERC20)",
    id: "Shiba-Inu-(SHIB-ERC20)",
    course: "73 170,7318",
    reserve: "630 млн",
    type: 'crypto'
  },
  {
    logoPrefix: "images/payment-systems/c-russ-standart.svg",
    name: "Русский Стандарт",
    id: "Русский-Стандарт",
    course: "80,2802",
    reserve: "8 млн",
    type: 'fiat',
  },
  {
    logoPrefix: "images/payment-systems/you-money.svg",
    name: "ЮMoney ₽",
    id: "ЮMoney-₽",
    course: "80,0239",
    reserve: "8 млн",
    type: 'fiat',
  },
  {
    logoPrefix: "images/payment-systems/c-mono.png",
    name: "Монобанк UAH",
    id: "Монобанк-UAH",
    course: "37,8546",
    disabled: true,
    reserve: "5 тыс",
    type: 'fiat',
  }
]

export function fetchPaymentSystems(): Promise<PaymentSystem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(paymentSystems)
    }, 500);
  });
}
