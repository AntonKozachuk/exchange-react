import classNames from 'classnames';
import { PaymentSystem } from '../../payment-systems/types';
import { getImageSource } from '../helpers/get-image-source';
import styles from './TransactionInfo.module.scss'

type TransactionInfoProps = {
  sourceAmount: string;
  sourceSystem: PaymentSystem;
  targetAmount: string;
  targetSystem: PaymentSystem;
}

export function TransactionInfo(props: TransactionInfoProps) {
  const {
    sourceAmount,
    sourceSystem,
    targetAmount,
    targetSystem
  } = props;

  return (
    <div className={styles["e-transaction-info"]}>
      <div className={styles["ti-currency-block"]}>
        <div className={styles["ti-amount"]}>
          <img src={getImageSource(sourceSystem.logoPrefix)} alt={sourceSystem.name} />
          {sourceAmount + sourceSystem.symbol}
        </div>
        <div className={styles["ti-wallet"]}></div>
      </div>
      <div className={styles["ti-arrow"]}></div>
      <div className={classNames(
                styles["ti-currency-block"],
                styles["ti-target-block"],
              )}>
        <div className={styles["ti-amount"]}>
          <img src={getImageSource(targetSystem.logoPrefix)} alt={targetSystem.name} />
          {targetAmount + targetSystem.symbol}
        </div>
        <div className={styles["ti-wallet"]}>
          <span className={styles["vBlockcainExplorerLink"]}>
            <a href="https://blockchair.com/dogecoin/address/DK1t6UhqRL9xqY5BKyb1rLAmT9UjGCBkdB" target="_blank" rel="noopener noreferrer">
              DK1t6UhqRL9xqY5BKyb1rLAmT9UjGCBkdB
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
