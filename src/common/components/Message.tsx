import React from 'react';
import classNames from 'classnames';
import styles from './Message.module.scss';

type MessageProps = {
  children: React.ReactNode;
  appearance?: 'danger' | 'info';
}

export function Message(props: MessageProps) {
  const { children, appearance = 'info' } = props;

  return (
    <div className={styles['e-message']}>
      <div className={classNames(styles['e-message__wrap'], styles[`e-message__wrap--${appearance}`])}>
        {children}
      </div>
    </div>
  )
}
