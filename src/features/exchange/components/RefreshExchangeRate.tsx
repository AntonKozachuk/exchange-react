import styles from "./RefreshExchangeRate.module.scss";
import { ProgressSpinner } from "./ProgressSpinner";

type RefreshExchangeRateProps = {
  progressValue: number;
  progressPercents: number;
  label: string;
  rate: string;
};

export function RefreshExchangeRate(props: RefreshExchangeRateProps) {
  const { progressValue, progressPercents, label, rate } = props;

  return (
    <div className={styles["e-refresh-exchange-rate"]}>
      <div className={styles["e-refresh-exchange-rate__wrapper"]}>
        <div className={styles["e-refresh-exchange-rate__timer"]}>
          <div className={styles["e-refresh-exchange-rate__progress-bar"]}>
            <ProgressSpinner
              size={30}
              color="rgb(140, 156, 170)"
              value={progressValue}
              progress={progressPercents}
            />
          </div>
        </div>
        <div className={styles["e-refresh-exchange-rate__text-block"]}>
          <div className={styles["e-refresh-exchange-rate__title"]}>
            {label}
          </div>

          <div className={styles["e-refresh-exchange-rate__value"]}>{rate}</div>
        </div>
      </div>
    </div>
  );
}
