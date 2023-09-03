import { useFormik, useField } from 'formik';
import setupStyles from './TransactionSetup.module.scss';
import styles from './TransactionPayment.module.scss';
import { ExchangeSteps } from './ExchangeSteps';
import { RefreshExchangeRateContainer } from '../RefreshExchangeRateContainer';
import { StepItem } from '../types';
import { PaymentSystem } from '../../payment-systems/types';
import classNames from 'classnames';
import { ProgressSpinner } from './ProgressSpinner';
import { useExchangeRefreshTimer } from '../hooks/use-exchange-refresh-timer';
import { useEffect, useState } from 'react';
import CopyToClipboardButton from './CopyToClipboardButton';
import { TransactionInfo } from './TransactionInfo';

type TransactionSetupProps = {
  onStepBack(): void;
  isShortView: boolean;
  steps: StepItem[];
  activeStepId: string;
  sourceSystem: PaymentSystem;
  targetSystem: PaymentSystem;
  goToNextStep(): void;
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

export function TransactionPayment(props: TransactionSetupProps | any) {
  const {
    onStepBack,
    isShortView,
    steps,
    activeStepId,
    sourceSystem,
    targetSystem,
    goToNextStep,
    sourceAmount,
    targetAmount
  } = props;

  const formik = useFormik<ExchangeForm>({
    initialValues: {
      sourceAmount: '',
      sourceCardNumber: '',
      sourceWalletAddress: '',
      targetAmount: '',
      targetCardNumber: '',
      targetWalletAddress: '',
      phone: '',
      email: ''
    },
    validateOnBlur: true,
    validateOnChange: true,
    validate(values: ExchangeForm) {
      const errors: Partial<ExchangeForm> = {};

      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      // onSubmit();
      goToNextStep(values, targetAmount);

      // Set submitting to false after submission is complete
      setSubmitting(false);
      // alert(JSON.stringify(values, null, 2));
    }
  });
  const REFRESH_TIME = 1200;

  const [progress, timeLeft] = useExchangeRefreshTimer(REFRESH_TIME, true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showRefreshExchangeRate, setShowRefreshExchangeRate] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (progress === 100) {
      setShowSpinner(true);
      setShowRefreshExchangeRate(false);

      timeout = setTimeout(() => {
        setShowSpinner(false);
        setShowRefreshExchangeRate(true);
      }, 1000);
    } else {
      setShowSpinner(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [progress]);

  useEffect(() => {
    if (!showRefreshExchangeRate) {
      const refreshTimeout = setTimeout(() => {
        setShowRefreshExchangeRate(true);
      }, REFRESH_TIME * 1000);

      return () => {
        clearTimeout(refreshTimeout);
      };
    }
  }, [showRefreshExchangeRate]);

  const status = {
    translation: false
  };

  return (
    <form
      className={styles['e-transaction-setup']}
      onSubmit={formik.handleSubmit}
    >
      <ExchangeSteps
        isShortView={isShortView}
        onStepBack={onStepBack}
        steps={steps}
        activeStepId={activeStepId}
      />

      <div className={setupStyles['e-transaction-setup__calculator']}>
        <div
          className={classNames(
            setupStyles['e-transaction-setup__course-refresh-block'],
            styles['e-transaction-setup__course-refresh-block']
          )}
        >
          <RefreshExchangeRateContainer
            sourceCourse={parseFloat(sourceSystem.course)}
            targetCourse={parseFloat(targetSystem.course)}
          />
        </div>

        <div
          className={classNames(styles['e-transaction-payment__header'], {
            [styles['e-transaction-payment__header--short-view']]: isShortView
          })}
        >
          <div className={styles['e-transaction-payment__header--title']}>
            {!status.translation ? 'Ожидание оплаты' : 'Обмен выполняется'}
          </div>
          <div className={styles['e-transaction-payment__header--title-info']}>
            №8453917 <span className="dated">от</span> 15.08.2023
          </div>
        </div>

        {!status.translation ? (
          <>
            <div className={styles['e-transaction-payment-body']}>
              <div className={styles['e-transaction-payment-body__main']}>
                <TransactionInfo
                  sourceAmount={sourceAmount}
                  sourceSystem={sourceSystem}
                  targetAmount={targetAmount}
                  targetSystem={targetSystem}
                />
                <div className="margin-top-30"></div>
              </div>
              <div className={styles['e-transaction-payment-body__aside']}>
                <div>
                  <div
                    className={
                      styles['e-transaction-payment-body__aside--timer']
                    }
                  >
                    <div className="vTimer">
                      <span className="pending-timer">
                        <ProgressSpinner
                          size={100}
                          color="rgb(11, 32, 57)"
                          value={timeLeft}
                          progress={progress}
                        />
                      </span>
                    </div>
                    <div
                      className={
                        styles['e-transaction-payment-body__aside--timer--text']
                      }
                    >
                      Оплатите заявку до окончания этого времени
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles['e-transaction-payment-back-body']}>
              <div className={styles['e-transaction-payment-back-body__main']}>
                <div
                  className={classNames(
                    styles['plate'],
                    styles['transparent'],
                    styles['p-left']
                  )}
                >
                  <h3>Переведите</h3>
                  <div className={styles['v-cripto-block']}>
                    {sourceAmount}
                    <span>{sourceSystem.name}</span>
                    <div className={styles['v-space']}></div>
                    <span className={styles['vCopy']}>
                      <span>
                        <div className={styles['v-copy-btn']}>
                          <CopyToClipboardButton
                            data={sourceAmount}
                            buttonText="Копировать"
                          />
                        </div>
                      </span>
                    </span>
                  </div>
                  <h3>На кошелек</h3>
                  <div
                    className={classNames(
                      styles['v-cripto-block'],
                      styles['v-cripto-wallet'],
                      styles['btn-top-2']
                    )}
                  >
                    TKtwrVXneGuCdUik9pfJGcBEcxEdkWtV27
                    <span className={styles['vCopy']}>
                      <span>
                        <div className={styles['v-copy-btn']}>
                          <CopyToClipboardButton
                            data={sourceAmount}
                            buttonText="Копировать"
                          />
                        </div>
                      </span>
                    </span>
                  </div>
                  <div className={styles['space']}></div>
                  <p className={styles['mini']}>
                    <b>
                      {'Данный адрес предназначен только для приема '}
                      {sourceSystem.name}{' '}
                    </b>
                  </p>
                  <p className={styles['mini']}>
                    <b>
                      Если вы уже сделали перевод, дождитесь обработки платежа.
                    </b>
                  </p>
                  <p className={styles['mini']}>
                    <b>
                      После того как транзакция будет зарегистрирована в сети,
                      мы увидим платеж и продолжим обмен.
                    </b>
                  </p>
                </div>
              </div>
              <div className={styles['e-transaction-payment-back-body__aside']}>
                <div>
                  <h2>QR-код для оплаты через приложение</h2>
                  <div className={styles['cripro-qr']}>
                    <canvas height="165" width="165"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles['e-transaction-payment-body']}>
            <div className={styles['e-transaction-payment-body__main']}>
              <div className={classNames(styles['plate'], styles['p-left'])}>
                <p>
                  Перевод по заявке <b>№8453971</b> начат.
                </p>
                <p>
                  Сейчас мы собираем транзакцию для отправки в сеть. Через
                  несколько минут обмен будет завершен и Вы сможете увидеть её в
                  браузере блоков.
                </p>
                <p>
                  Если ничего не происходит в течение долгого времени,
                  пожалуйста, обратитесь{' '}
                  <a href="http://support.netex24.net/" target="_blank" rel="noreferrer">
                    в службу поддержки
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className={styles['e-transaction-payment-actions__body']}>
          <div
            className={styles['e-transaction-payment-actions__full-wrapper']}
          ></div>
          <div className={styles['display-flex']}>
            <div className={styles['refresh']}>
              Мы проверяем оплату автоматически, чтобы вам не приходилось
              обновлять страницу.
            </div>
          </div>
          <div className={styles['hidden']}>
            <div className="vFormButton">
              <button type="submit" className="is-danger">
                <div className="v-btn-title">Submit</div>
              </button>
            </div>
          </div>
          <div className={styles['e-transaction-payment-actions__aside']}></div>
        </div>
      </div>
    </form>
  );
}
