import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
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
import QRCode from "react-qr-code";

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
  const { t } = useTranslation();

  const [progress, timeLeft] = useExchangeRefreshTimer(REFRESH_TIME, true, 0);
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
            {!status.translation ? t('payment.waiting.title') : t('payment.sending.title')}
          </div>
          <div className={styles['e-transaction-payment__header--title-info']}>
            №8453917 <span className="dated">{t('dated')}</span> 15.08.2023
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
                          size={75}
                          color="rgb(11, 32, 57)"
                          value={timeLeft}
                          progress={progress}
                          bold
                        />
                      </span>
                    </div>
                    <div
                      className={
                        styles['e-transaction-payment-body__aside--timer--text']
                      }
                    >
                      {t('payment.waiting.pay')}
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
                  <h3>{t('payment.waiting.transfer')}</h3>
                  <div className={styles['v-cripto-block']}>
                    {sourceAmount}
                    <span>{sourceSystem.name}</span>
                    <div className={styles['v-space']}></div>
                    <span className={styles['vCopy']}>
                      <span>
                        <div className={styles['v-copy-btn']}>
                          <CopyToClipboardButton
                            data={sourceAmount}
                            buttonText={(t('payment.waiting.copy'))}
                          />
                        </div>
                      </span>
                    </span>
                  </div>
                  <h3>{t('payment.waiting.toWallet')}</h3>
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
                            buttonText={(t('payment.waiting.copy'))}
                          />
                        </div>
                      </span>
                    </span>
                  </div>
                  <div className={styles['space']}></div>
                  <p className={styles['mini']}>
                    <b>
                      {t('payment.waiting.address') + ' '}
                      {sourceSystem.name}{' '}
                    </b>
                  </p>
                  <p className={styles['mini']}>
                    <b>
                      {t('payment.waiting.made')}
                    </b>
                  </p>
                  <p className={styles['mini']}>
                    <b>
                      {t('payment.waiting.registered')}
                    </b>
                  </p>
                </div>
              </div>
              <div className={styles['e-transaction-payment-back-body__aside']}>
                <div className={styles['e-cripro-aside']}>
                  <h2>{t('payment.waiting.qr')}</h2>
                  <div className={styles['cripro-qr']}>
                    <QRCode value={"Test"} size={165} />
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
              {t('payment.auto')}
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
