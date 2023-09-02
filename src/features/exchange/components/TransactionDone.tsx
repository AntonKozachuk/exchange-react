import { useFormik, useField } from "formik";
import styles from "./TransactionDone.module.scss";
import paymentStyles from './TransactionPayment.module.scss';
import { ExchangeSteps } from "./ExchangeSteps";
import { RefreshExchangeRateContainer } from "../RefreshExchangeRateContainer";
import { StepItem } from "../types";
import { PaymentSystem } from "../../payment-systems/types";
import { getImageSource } from "../helpers/get-image-source";
import { Input } from "../../../common/components/Input";
import { CalculatorFormField } from "./CalculatorFormField";
import classNames from "classnames";
import { TransactionInfo } from "./TransactionInfo";
import { FormButton } from "./FormButton";

type TransactionDoneProps = {
  onStepBack(): void;
  isShortView: boolean;
  steps: StepItem[];
  activeStepId: string;
  sourceSystem: PaymentSystem;
  targetSystem: PaymentSystem;
  sourceAmount: string;
  targetAmount: string;
};

type ExchangeForm = {
  sourceAmount: string;
  sourceCardNumber: string;
  sourceWalletAddress: string;
  targetAmount: string;
  targetCardNumber: string;
  targetWalletAddress: string;
  phone: string;
  email: string;
};

export function TransactionDone(props: TransactionDoneProps) {
  const {
    onStepBack,
    isShortView,
    steps,
    activeStepId,
    sourceSystem,
    targetSystem,
    sourceAmount,
    targetAmount
  } = props;

  const formik = useFormik<ExchangeForm>({
    initialValues: {
      sourceAmount: "",
      sourceCardNumber: "",
      sourceWalletAddress: "",
      targetAmount: "",
      targetCardNumber: "",
      targetWalletAddress: "",
      phone: "",
      email: "",
    },
    // isInitialValid: false,
    validateOnBlur: true,
    validateOnChange: true,
    validate(values: ExchangeForm) {
      const errors: Partial<ExchangeForm> = {};
  
      return errors;
    },
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const status = {
    translation: false
  };

  return (
    <form
      className={styles["e-transaction-setup"]}
      onSubmit={formik.handleSubmit}
    >
      <ExchangeSteps
        isShortView={isShortView}
        onStepBack={onStepBack}
        steps={steps}
        activeStepId={activeStepId}
      />

      <div className={paymentStyles["e-transaction-setup__calculator"]}>
        <div className={paymentStyles["e-transaction-setup__course-refresh-block"]}>
          <RefreshExchangeRateContainer sourceCourse={parseFloat(sourceSystem.course)} targetCourse={parseFloat(targetSystem.course)} />
        </div>

        <div
          className={classNames(paymentStyles['e-transaction-payment__header'], {
            [paymentStyles['e-transaction-payment__header--short-view']]: isShortView
          })}
        >
          <div className={classNames(paymentStyles['e-transaction-payment__header--title'], styles['is-success'])}>
            {!status.translation ? 'Обмен завершен' : 'Обмен выполняется'}
          </div>
          <div className={classNames(paymentStyles['e-transaction-payment__header--title-info'], styles['is-success'])}>
            №8453917 <span className="dated">от</span> 15.08.2023
          </div>
        </div>

        <div className={styles["e-transaction-done-body"]}>
          <div className={styles["e-transaction-done-main"]}>
            <div className={classNames(
                    styles['plate'],
                    styles['transparent']
                  )}>
              <div 
              className={classNames(
                styles['v-sign'],
                styles['v-sign-success'],
                styles['v-float-left']
              )}></div>
              <p className={styles["p-left"]}>
                Спасибо за использование сервиса и доверие. Будем рады видеть Вас снова. Если вам понравилась наша
                работа, просим
                <a target="_blank" href="https://www.bestchange.ru/netex24-exchanger.html"
                  className="comment-link">подарить нам короткий отзыв</a>
              </p>
            </div>
            <br />
            
            <TransactionInfo
                  sourceAmount={sourceAmount}
                  sourceSystem={sourceSystem}
                  targetAmount={targetAmount}
                  targetSystem={targetSystem}
                />
          </div>

          <div className={styles["e-transaction-done-aside"]}>
            <div>
              <img src="https://netex24.net/images/icon-blockchain.svg" alt="" className={classNames(styles['wh-50-70'], styles['margin-top-143'])}/>
              <p>
                <span className="translate-it">Посмотреть операцию в </span>
                <span className="vBlockcainExplorerLink">
                  <a href="https://blockchair.com/dogecoin/transaction/9cb2e3371db81744013df3f280ed01f3f3769350d265461ac2cdc2f352931936"
                    target="_blank" className="translate-it">браузере блоков</a>
                </span>
              </p>
              <br />
            </div>
          </div>
        </div>

        <div className={styles["e-transaction-done-actions-body"]}>
          <div className={styles["e-transaction-done-actions-full"]}></div>
          <div className={styles["e-transaction-done-actions"]}>
            <div className="actions-group">
              <div className={styles["v-flex"]}>
                <FormButton text={"Новый обмен"}/>
                <FormButton text={"Повторить"} isRepeat/>
              </div>
              <div className={classNames(styles['e-info-block'], styles['margin-top-30'])}>
                <div className={styles["e-info-block__main"]}>
                  <div className="e-info-block__main__icon">
                    <div className="v-icon svg-icon--gift">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        
                      </svg>
                    </div>
                  </div>
                  <div className="e-info-block__main__body">
                    <div className="e-info-block__main__body__text">
                      Подари нам короткий отзыв о нашей работе и прими участие в розыгрыше 25000 руб.
                      Через 5 д. 13 ч. 55 м. 22 с.
                      наш смарт-контракт выберет новых победителей. Ты можешь быть в их числе!
                    </div>
                  </div>
                </div>
                <div className="e-info-block__actions">
                  <div className="x-btn thin black">
                    <button className="x-btn__native">
                      <span className="x-btn__native--body">
                        <span className="x-btn--label">Стать участником</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="e-transaction-done-actions-aside"></div>
        </div>

      </div>
    </form>
  );
}
