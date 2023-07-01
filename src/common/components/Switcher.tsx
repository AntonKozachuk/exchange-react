import React from 'react';
import classNames from 'classnames';
import styles from './Switcher.module.scss'


export interface SwitcherOption {
  id: string;
  label: string;
}

type SwitcherProps = {
  options: SwitcherOption[];
  selectedId?: string;
  className?: string;
  onSelect: (item: SwitcherOption) => void;
  inline?: boolean
  size?: 'small' | 'medium';
  appearance?: 'default' | 'simple';
}

export function Switcher(props: SwitcherProps) {
  const {
    options,
    onSelect,
    inline = false,
    size = 'medium',
    className = '',
    appearance = 'default',
    selectedId
  } = props;

  return (
    <div className={
      classNames(styles['e-switcher'], className, {
        [styles['e-switcher--inline']]: inline,
      })}
    >
      {options.map((option: SwitcherOption) => (
        <div
          key={option.id}
          onClick={() => onSelect(option)}
          className={classNames(
            styles['e-switcher__option'],
            styles[`e-switcher__option--size-${size}`],
            styles[`e-switcher__option--appearance-${appearance}`], {
              [styles['e-switcher__option--active']]: option.id === selectedId,
            }
          )}
        >
          <span>{option.label}</span>
        </div>
      ))}
    </div>
  )
}
