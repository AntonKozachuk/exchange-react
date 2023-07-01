import React from 'react';
import styles from './CalculatorFormField.module.scss';
import { Input, InputProps } from '../../../common/components/Input';
import { Message } from '../../../common/components/Message';
import classNames from 'classnames';

type FieldExtensionInfo = {
  title: string;
  value: number;
  invalid?: boolean;
}

type CalculatorFormGroupProps = {
  inputProps: InputProps;
  label?: string;

  invalid?: boolean;
  extensionInfo?: FieldExtensionInfo[];
  errorMessage?: string;
}

export function CalculatorFormField(props: CalculatorFormGroupProps) {
  const {
    inputProps,
    label = '',
    // children,
    extensionInfo = [],
    errorMessage = '',
    invalid = false,
  } = props;

  return (
    <div className={styles['e-calculator-form-group']}>
      <div className={styles['e-calculator-form-group__label']}>{label}</div>
      <div className={styles['e-calculator-form-group__field']}>
        <Input
          invalid={invalid}
          {...inputProps}
        />
      </div>

      <div className={styles['e-calculator-form-group__extension']}>
        {Boolean(extensionInfo.length) && (
          <div className={styles['e-calculator-form-group__extension-wrapper']}>
            {extensionInfo.map((info: FieldExtensionInfo) => (
              <React.Fragment key={info.title}>
                <div
                  className={classNames(styles['e-calculator-form-group__extension-item'], {
                    [styles['e-calculator-form-group__extension-item--invalid']]: info.invalid
                  })}
                >
                  <span className={styles['e-calculator-form-group__extension-item-title']}>{info.title}</span>
                  {' '}
                  <span>{info.value}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <div className={styles['e-calculator-form-group__message']}>
        {errorMessage && (
          <Message appearance="danger">
            {'Поле суммы не может быть пустым '}
          </Message>
        )}
      </div>
    </div>
  )
}
