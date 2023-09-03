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
        <div className={styles["e-transaction-setup__course-refresh-block"]}>
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
                    <div className={classNames(styles['v-icon'], styles['svg-icon--gift'])}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 5.5C6.25 3.70507 7.70507 2.25 9.5 2.25C10.5052 2.25 11.4038 2.70637 12 3.42322C12.5962 2.70637 13.4948 2.25 14.5 2.25C16.2949 2.25 17.75 3.70507 17.75 5.5C17.75 6.14432 17.5625 6.74485 17.2391 7.25H18C19.5188 7.25 20.75 8.48122 20.75 10V12C20.75 12.8042 20.2076 13.4816 19.4687 13.6865C19.6128 15.5131 19.5293 17.3517 19.2195 19.1597C19.0345 20.2394 18.1576 21.0665 17.069 21.1881L16.1545 21.2903C13.3934 21.5989 10.6066 21.5989 7.84548 21.2903L6.93101 21.1881C5.84239 21.0665 4.96552 20.2394 4.78052 19.1597C4.47069 17.3517 4.38724 15.5131 4.53131 13.6865C3.7924 13.4816 3.25 12.8042 3.25 12V10C3.25 8.48122 4.48122 7.25 6 7.25H6.76091C6.4375 6.74485 6.25 6.14432 6.25 5.5ZM11.25 5.5C11.25 4.5335 10.4665 3.75 9.5 3.75C8.5335 3.75 7.75 4.5335 7.75 5.5C7.75 6.4665 8.5335 7.25 9.5 7.25C10.4665 7.25 11.25 6.4665 11.25 5.5ZM14.5 7.25C15.4665 7.25 16.25 6.4665 16.25 5.5C16.25 4.5335 15.4665 3.75 14.5 3.75C13.5335 3.75 12.75 4.5335 12.75 5.5C12.75 6.4665 13.5335 7.25 14.5 7.25ZM4.75 10C4.75 9.30964 5.30964 8.75 6 8.75H11.25V12.25H5C4.86193 12.25 4.75 12.1381 4.75 12V10ZM12.75 13.75H17.969C18.1093 15.4706 18.0329 17.203 17.741 18.9064C17.6689 19.3274 17.3269 19.65 16.9024 19.6974L15.9879 19.7996C14.9116 19.9199 13.8312 19.9914 12.75 20.014V13.75ZM12.75 12.25H19C19.1381 12.25 19.25 12.1381 19.25 12V10C19.25 9.30964 18.6904 8.75 18 8.75H12.75V12.25ZM11.25 13.75V20.014C10.1688 19.9914 9.08842 19.9199 8.01209 19.7996L7.09762 19.6974C6.67308 19.65 6.33112 19.3274 6.25897 18.9064C5.96708 17.203 5.89074 15.4706 6.03103 13.75H11.25Z" fill="#287AD8"></path></svg>
                    </div>
                  </div>

                  <div className={styles["e-info-block__main__body"]}>
                    <div className={styles["e-info-block__main__body__text"]}>
                      Подари нам короткий отзыв о нашей работе и прими участие в розыгрыше 25000 руб.
                      Через 5 д. 13 ч. 55 м. 22 с.
                      наш смарт-контракт выберет новых победителей. Ты можешь быть в их числе!
                    </div>
                  </div>
                </div>
                <div className={styles["e-info-block__actions"]}>
                  <div className={classNames(styles['e-btn'], styles['thin'], styles['black'])}>
                    <button className={styles["e-btn__native"]}>
                      <span className={styles["e-btn__native--body"]}>
                        <span className={styles["e-btn--label"]}>Стать участником</span>
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
