import { useFormik } from 'formik';
import axios from 'axios';
import styles from './TransactionSetup.module.scss';
import stylesCalc from './CalculatorFormField.module.scss';
import { ExchangeSteps } from './ExchangeSteps';
import { RefreshExchangeRateContainer } from '../RefreshExchangeRateContainer';
import { StepItem } from '../types';
import { PaymentSystem } from '../../payment-systems/types';
import { getImageSource } from '../helpers/get-image-source';
import { CalculatorFormField } from './CalculatorFormField';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import AmlPlate from './AmlPlate';
import { useEffect } from 'react';

type TransactionSetupProps = {
  onStepBack(): void;
  isShortView: boolean;
  steps: StepItem[];
  activeStepId: string;
  sourceSystem: PaymentSystem;
  targetSystem: PaymentSystem;
  goToNextStep(values: ExchangeForm, targetAmount: string): void;
  setSourceAmount(amount: string): void;
  setTargetAmount(amount: string): void;
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

const calcul = (
  sourceAmount: string,
  sourceSystem: PaymentSystem,
  targetSystem: PaymentSystem
): string => {
  let sourceCourse = parseFloat(sourceSystem.course);
  if (sourceSystem.type === 'fiat') {
    sourceCourse = 1 / sourceCourse;
  }
  let sourceAmountToDollars = parseFloat(sourceAmount) * sourceCourse;

  let targetCourse = parseFloat(targetSystem.course);
  if (targetSystem.type === 'fiat') {
    targetCourse = 1 / targetCourse;
  }
  let result = sourceAmountToDollars / targetCourse;

  return result.toFixed(4).replace(/\.?0+$/, '').toString();
};

const reverseCalcul = (targetAmount: string, sourceSystem: PaymentSystem, targetSystem: PaymentSystem): string => {
  let targetCourse = parseFloat(targetSystem.course);
  if (targetSystem.type === 'fiat') {
    targetCourse = 1 / targetCourse;
  }
  let targetAmountToDollars = parseFloat(targetAmount) * targetCourse;

  let sourceCourse = parseFloat(sourceSystem.course);
  if (sourceSystem.type === 'fiat') {
    sourceCourse = 1 / sourceCourse;
  }
  let result = targetAmountToDollars / sourceCourse;

  return result.toFixed(4).replace(/\.?0+$/, '').toString();
};


export function TransactionSetup(props: TransactionSetupProps) {
  const {
    onStepBack,
    isShortView,
    steps,
    activeStepId,
    sourceSystem,
    targetSystem,
    setSourceAmount,
    setTargetAmount,
    goToNextStep
  } = props;

  const { t } = useTranslation();

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

      if (!values.sourceAmount) {
        errors.sourceAmount = t('sourceAmountError');
      }

      if (sourceSystem.type !== 'crypto' && !values.sourceCardNumber) {
        errors.sourceCardNumber = 'Source card number cannot be empty';
      }

      if (sourceSystem.type === 'crypto' && !values.sourceWalletAddress) {
        errors.sourceWalletAddress =
          t('sourceWalletAddressError') + ' ' + sourceSystem.name;
      }

      if (!values.phone) {
        errors.phone = t('phoneError');
      }

      if (!values.email) {
        errors.email = t('emailError');
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      const sourceAmountValue = parseFloat(values.sourceAmount);

      if (isNaN(sourceAmountValue) || sourceAmountValue < sourceMin || sourceAmountValue > sourceMax) {
        setSubmitting(false);
        return;
      }

      const targetAmount = calcul(
        values.sourceAmount,
        sourceSystem,
        targetSystem
      );

      setSourceAmount(values.sourceAmount);
      setTargetAmount(targetAmount);

      // const postData = {
      //   sourceAmount: values.sourceAmount,
      //   sourceCardNumber: values.sourceCardNumber,
      //   sourceWalletAddress: values.sourceWalletAddress,
      //   targetAmount: values.targetAmount,
      //   targetCardNumber: values.targetCardNumber,
      //   targetWalletAddress: values.targetWalletAddress,
      //   phone: values.phone,
      //   email: values.email,
      // };

      // goToNextStep(values, targetAmount);

      const postData = {
        sourceId: sourceSystem.id,
        targetId: targetSystem.id,
        sourceAmount: values.sourceAmount,
        targetAmount: targetAmount,
        wallet: values.sourceWalletAddress || values.targetWalletAddress, // assuming wallet address is one of these
        email: values.email,
      };
    
      try {
        const response = await axios.post('https://ragingviper.store/api/order', postData);
        console.log('API Response:', response.data);
        goToNextStep(values, targetAmount);
      } catch (error) {
        console.error("Error submitting order:", error);
        // Handle the error appropriately
      }

      setSubmitting(false);
    }
  });

  const handleSourceAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    if (/^[0-9.]*$/.test(newValue)) {
      formik.handleChange(event);

      let newTargetAmount = '0';
      if (newValue !== '') {
        newTargetAmount = calcul(newValue, sourceSystem, targetSystem);
      }

      formik.setFieldValue('targetAmount', newTargetAmount);
    }
  };

  const handleTargetAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (/^[0-9.]*$/.test(newValue)) {
      formik.setFieldValue('targetAmount', newValue);
  
      let newSourceAmount = '0';
      if (newValue !== '') {
        newSourceAmount = reverseCalcul(newValue, sourceSystem, targetSystem);
      }
  
      formik.setFieldValue('sourceAmount', newSourceAmount);
    }
  };

  useEffect(() => {
    formik.resetForm();
  }, [sourceSystem, targetSystem, formik.setFieldValue]);
  

  const sourceMin = parseFloat(sourceSystem.min);
  const sourceMax = parseFloat(sourceSystem.max);
  const targetMin = parseFloat(targetSystem.min);
  const targetMax = parseFloat(targetSystem.max);

  const sourceAmountValue = parseFloat(formik.values.sourceAmount);
  const isSourceAmountInvalid = isNaN(sourceAmountValue) || sourceAmountValue < sourceMin || sourceAmountValue > sourceMax;

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

      <div className={styles['e-transaction-setup__calculator']}>
        <div className={styles['e-transaction-setup__course-refresh-block']}>
          <RefreshExchangeRateContainer
            sourceCourse={parseFloat(sourceSystem.course)}
            targetCourse={parseFloat(targetSystem.course)}
          />
        </div>

        <div
          className={classNames(
            styles['e-transaction-setup__calculator-wrapper'],
            {
              [styles['e-transaction-setup__calculator-wrapper--short-view']]:
                isShortView
            }
          )}
        >
          <div className={styles['e-transaction-setup__direction-name']}>
            <img src={getImageSource(sourceSystem.logoPrefix)} alt="" />{' '}
            <span>{t('exchange') + ' ' + sourceSystem.name}</span>
          </div>

          <div className={styles['e-transaction-setup__calculator-line']}>
            <CalculatorFormField
              invalid={Boolean(formik.errors.sourceAmount || isSourceAmountInvalid)}
              errorMessage={formik.errors.sourceAmount}
              inputProps={{
                name: 'sourceAmount',
                suffix: sourceSystem.symbol,
                value: formik.values.sourceAmount,
                onChange: handleSourceAmountChange,
                onBlur: formik.handleBlur,
                onFocus: () => {
                  formik.setFieldTouched('sourceAmount', true);
                }
              }}
              label={t('sum')}
              extensionInfo={[
                {
                  title: t('min'),
                  value: sourceMin,
                  invalid: parseFloat(formik.values.sourceAmount) < sourceMin
                },
                {
                  title: t('max'),
                  value: sourceMax,
                  invalid: parseFloat(formik.values.sourceAmount) > sourceMax
                }
              ]}
            />
          </div>

          {sourceSystem.type === 'crypto' ? (
            <div className={styles['e-transaction-setup__calculator-line']}>
              <CalculatorFormField
                invalid={Boolean(formik.errors.sourceWalletAddress)}
                errorMessage={formik.errors.sourceWalletAddress}
                inputProps={{
                  name: 'sourceWalletAddress',
                  placeholder: '0x687422eea2cb73b5d3e242ba5456b782919afc85',
                  value: formik.values.sourceWalletAddress,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  onFocus: () => {
                    formik.setFieldTouched('sourceWalletAddress', true);
                  }
                }}
                label={t('address') + ' ' + sourceSystem.name}
              />
            </div>
          ) : (
            <div className={styles['e-transaction-setup__calculator-line']}>
              <CalculatorFormField
                invalid={Boolean(formik.errors.sourceCardNumber)}
                errorMessage={formik.errors.sourceCardNumber}
                inputProps={{
                  name: 'sourceCardNumber',
                  value: formik.values.sourceCardNumber,
                  placeholder: '0000 0000 0000 0000',
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  onFocus: () => {
                    formik.setFieldTouched('sourceCardNumber', true);
                  }
                  // type: 'text',
                }}
                label={t('cardNumber')}
              />
            </div>
          )}

          <div className={styles['e-transaction-setup__direction-name']}>
            <img src={getImageSource(targetSystem.logoPrefix)} alt="" />{' '}
            <span>{t('to') + ' ' + targetSystem.name}</span>
          </div>
          <div className={styles['e-transaction-setup__calculator-line']}>
            <CalculatorFormField
              errorMessage={formik.errors.targetAmount}
              invalid={!!formik.errors.targetAmount}
              inputProps={{
                name: 'targetAmount',
                suffix: targetSystem.symbol,
                value: formik.values.targetAmount,
                onChange: handleTargetAmountChange,
                onBlur: formik.handleBlur,
                onFocus: () => {}
              }}
              label={t('sum')}
              extensionInfo={[
                {
                  title: 'Резерв',
                  value: parseInt(targetSystem.reserve, 10)
                },
                {
                  title: t('min'),
                  value: targetMin
                },
                {
                  title: t('max'),
                  value: targetMax
                }
              ]}
            />
          </div>

          {targetSystem.type === 'crypto' ? (
            <div className={styles['e-transaction-setup__calculator-line']}>
              <CalculatorFormField
                invalid={Boolean(formik.errors.targetWalletAddress)}
                errorMessage={formik.errors.targetWalletAddress}
                inputProps={{
                  name: 'targetWalletAddress',
                  placeholder: '0x687422eea2cb73b5d3e242ba5456b782919afc85',
                  value: formik.values.targetWalletAddress,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  onFocus: () => {
                    formik.setFieldTouched('targetWalletAddress', true);
                  }
                }}
                label={t('address') + ' ' + targetSystem.name}
              />
            </div>
          ) : (
            <div className={styles['e-transaction-setup__calculator-line']}>
              <CalculatorFormField
                invalid={Boolean(formik.errors.targetCardNumber)}
                errorMessage={formik.errors.targetCardNumber}
                inputProps={{
                  name: 'targetCardNumber',
                  value: formik.values.targetCardNumber,
                  placeholder: '0000 0000 0000 0000',
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  onFocus: () => {
                    formik.setFieldTouched('targetCardNumber', true);
                  }
                }}
                label={t('cardNumber')}
              />
            </div>
          )}

          <hr />

          <div className={styles['e-transaction-setup__direction-name']}>
            <div className={styles['e-transaction-setup__calculator-line']}>
              <CalculatorFormField
                invalid={Boolean(formik.errors.phone)}
                errorMessage={formik.errors.phone}
                inputProps={{
                  name: 'phone',
                  type: 'tel',
                  placeholder: '+7 (903) 123-45-67',
                  value: formik.values.phone,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  onFocus: () => {
                    formik.setFieldTouched('phone', true);
                  }
                }}
                label={t('yourNumber')}
              />
            </div>

            <div className={styles['e-transaction-setup__calculator-line']}>
              <CalculatorFormField
                invalid={Boolean(formik.errors.email)}
                errorMessage={formik.errors.email}
                inputProps={{
                  name: 'email',
                  type: 'email',
                  placeholder: 'ivanov@mail.ru',
                  value: formik.values.email,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  onFocus: () => {
                    formik.setFieldTouched('email', true);
                  }
                }}
                label={t('email')}
                customContent={t('cashback')}
              />
            </div>
          </div>

          <div className={styles['e-transaction-setup__calculator-line']}>
            <div className={stylesCalc['e-calculator-form-group__label']} />
            <div className={stylesCalc['e-calculator-form-group__field']}>
              <div>
                <button className={styles['e-submit-button']} type="submit">
                  <div className={styles['e-btn-title']}>
                    {t('proceedToPayment')}
                  </div>
                </button>
              </div>
            </div>
            <div className={stylesCalc['e-calculator-form-group__extension']}>
              <div
                className={
                  stylesCalc['e-calculator-form-group__extension-wrapper']
                }
              >
                <p
                  className={
                    stylesCalc[
                      'e-calculator-form-group__extension__pay-info-text'
                    ]
                  }
                >
                  {t('paymentConfirmation') + ' '}
                  <a href="#/termsOfUse" target="_blank">
                    {t('termsOfUse')}
                  </a>{' '}
                  {t('and') + ' '}
                  <a href="#/kyt" target="_blank">
                    {t('amlKycPolicies')}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div
            className={classNames(
              styles['e-transaction-setup__calculator-line'],
              styles['full']
            )}
          >
            <AmlPlate />
          </div>
        </div>
      </div>
    </form>
  );
}
