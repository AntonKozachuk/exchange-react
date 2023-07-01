import React, { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  id?: string;
  className?: string;
  type?: string;
  suffix?: React.ReactNode | string;
  // placeholder?: string;
  // min?: string | number;
  // max?: string | number;
  // step?: string | number;
  invalid?: boolean;
  value?: string | number;
  // onChange? : (event: React.ChangeEvent) => void;
};

export function Input(props: InputProps) {
  const {
    name,
    className = '',
    type = 'text',
    suffix,
    placeholder = '',
    invalid = false,
    value,
    id,
    min,
    max,
    step,
    onChange,
    ...otherProps
  } = props;

  return (
    <div
      className={classNames(styles['e-input'], className, {
        [styles['e-input--invalid']]: invalid,
      })}
    >
      <input
        id={id}
        className={classNames(styles['e-input__field'], {
          [styles['e-input__field--with-suffix']]: suffix,
        })}
        name={name}
        placeholder={placeholder}
        type={type}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        {...otherProps}
      />

      {suffix && (
        <div className={styles['e-input__suffix']}>
          {suffix}
        </div>
      )}
    </div>
  )
}
