import React from 'react';
import classNames from 'classnames';
import styles from './MainButton.module.scss';

type MainButtonProps = {
  imgSrc?: string;
  href: string;
  label?: string;
  target: string;
  className: null | string;
};
export function MainButton(props: MainButtonProps) {
  const { imgSrc, href, label, target, className } = props;

  return (
    <div className={classNames(styles['e-main-button'], className)}>
      {imgSrc && (
        <>
          <img src={imgSrc} alt="" className={styles['e-main-button__img']} />
          {' '}
        </>
      )}
      {label && (
        <span>{label}</span>
      )}
      <a className={styles['e-main-button__cta']} href={href} target={target} />
    </div>
  );
}

MainButton.defaultProps = {
  target: '_self',
  className: null,
};
