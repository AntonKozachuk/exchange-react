import React from 'react';
import { useFormik, useField } from 'formik';
import styles from './TransactionSetup.module.scss';
import { ExchangeSteps } from './ExchangeSteps';
import { RefreshExchangeRateContainer } from '../RefreshExchangeRateContainer';
import { StepItem } from '../types';
import { PaymentSystem } from '../../payment-systems/types';
import { getImageSource } from '../helpers/get-image-source';
import { Input } from '../../../common/components/Input';
import { CalculatorFormField } from './CalculatorFormField';
import classNames from 'classnames';

type TransactionSetupProps = {
  onStepBack(): void;
  isShortView: boolean;
  steps: StepItem[];
  activeStepId: string;
  sourceSystem: PaymentSystem;
  targetSystem: PaymentSystem;
}

type ExchangeForm = {
  sourceAmount: string;
  cardNumber: string;
  targetAmount: string;
}

export function TransactionSetup(props: TransactionSetupProps) {
  const {
    onStepBack,
    isShortView,
    steps,
    activeStepId,
    sourceSystem,
    targetSystem
  } = props;

  const formik = useFormik<ExchangeForm>({
    initialValues: {
      sourceAmount: '',
      cardNumber: '',
      targetAmount: ''
    },
    // isInitialValid: false,
    validateOnBlur: true,
    validateOnChange: true,
    validate(values: ExchangeForm) {
      return Object.entries(values).reduce((result: any, [key, value]) => {

        console.log(key,formik.touched,  formik.touched[key as keyof ExchangeForm])
        if (formik.touched[key as keyof ExchangeForm]) {
          if (!value) {
            return {
              ...result,
              [key]: 'Строка не может быть пустой'
            }
          }
        }
        return result;
        // if (formik.touched[fieldName]) {
        //   return {
        //     ...result,
        //     [fieldName]: 'Поле не может быть пустым'
        //   }
        // }
      }, {})
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const sourceMin = 100;
  const sourceMax = 900000;


  return (
    <div className={styles['e-transaction-setup']}>
      <ExchangeSteps
        isShortView={isShortView}
        onStepBack={onStepBack}
        steps={steps}
        activeStepId={activeStepId}
      />

      <div className={styles['e-transaction-setup__calculator']}>
        <div className={styles['e-transaction-setup__course-refresh-block']}>
          <RefreshExchangeRateContainer />
        </div>

        <div
          className={classNames(styles['e-transaction-setup__calculator-wrapper'], {
            [styles['e-transaction-setup__calculator-wrapper--short-view']]: isShortView,
          })}
        >
          <div className={styles['e-transaction-setup__direction-name']}>
            <img src={getImageSource(sourceSystem.logoPrefix)} alt=""/>
            {' '}
            <span>{'Обмен'}</span>
            {', '}
            <span>{sourceSystem.name}</span>


            {/*<Input value={123} onChange={() => {}} invalid={true} suffix={'qwerty'} />*/}
          </div>

          <div className={styles['e-transaction-setup__calculator-line']}>
            <CalculatorFormField
              invalid={Boolean(formik.errors.sourceAmount)}
              errorMessage={formik.errors.sourceAmount}
              inputProps={{
                name: 'sourceAmount',
                value: formik.values.sourceAmount,
                onChange: formik.handleChange,
                onBlur: formik.handleBlur,
                onFocus: () => {

                  formik.setFieldTouched('sourceAmount', true);
                }
                // type: 'text',
              }}
              label={'Сумма'}
              extensionInfo={[
                // {
                //   title: 'Резерв',
                //   value: sourceMin
                // },
                {
                  title: 'Мин',
                  value: sourceMin,
                  invalid: parseFloat(formik.values.sourceAmount) < sourceMin
                },
                {
                  title: 'Макс',
                  value: sourceMax,
                  invalid: parseFloat(formik.values.sourceAmount) > sourceMax
                },
              ]}
            />
          </div>
          <div>
            <CalculatorFormField
              errorMessage={formik.errors.cardNumber}
              invalid={!!formik.errors.cardNumber}
              inputProps={{
                name: 'cardNumber',
                value: formik.values.cardNumber,
                onChange: (value) => {
                  console.log('value', value)
                  // formik.handleChange()
                },
                onBlur: formik.handleBlur,
                onFocus: () => {

                  console.log('NA HUI')
                }
                // type: 'text',
              }}
              label={'Сумма'}
              extensionInfo={[
                {
                  title: 'Резерв',
                  value: 900000
                },
                {
                  title: 'Мин',
                  value: 100
                },
                // {
                //   title: 'Макс',
                //   text: '9000'
                // },
              ]}
            />
          </div>

          <div className={styles['e-transaction-setup__direction-name']}>
            <img src={getImageSource(targetSystem.logoPrefix)} alt=""/>
            {' '}
            <span>{'Обмен'}</span>
            {', '}
            <span>{targetSystem.name}</span>


            {/*<Input value={123} onChange={() => {}} invalid={true} suffix={'qwerty'} />*/}
          </div>
        </div>
      </div>
    </div>
  );
}
