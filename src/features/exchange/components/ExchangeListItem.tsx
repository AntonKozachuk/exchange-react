import React from 'react';
import classNames from 'classnames';
import styles from './ExchangeListItem.module.scss';
import { useMediaQuery } from '../../../common/hooks/use-media-query';

type ExchangeListItemProps = {
  title: string;
  changeText?: string;
  logoSrc: string;
  active: boolean;
  disabled?: boolean;
  info?: string | null;
  onClick: () => void;
  compactView?: boolean;
  invisible?: boolean;
  onItemChange: () => void;
}

export function ExchangeListItem(props: ExchangeListItemProps) {
  const {
    title,
    logoSrc,
    changeText = '',
    info = null,
    active= false,
    disabled = false,
    compactView = false,
    invisible = false,
    onClick,
    onItemChange = Function.prototype,
  } = props;

  const isLargeScreen = useMediaQuery('(min-width: 767px)');

  function onChangeClick(event: React.SyntheticEvent): void {
    event.stopPropagation();

    onItemChange()
  }

  return (
    <div
      onClick={onClick}
      className={classNames(styles['e-exchange-list-item'], {
        [styles['e-exchange-list-item--active']]: active,
        [styles['e-exchange-list-item--disabled']]: disabled,
        [styles['e-exchange-list-item--compact-view']]: compactView,
        [styles['e-exchange-list-item--show-arrow']]: active && !compactView && isLargeScreen,
        [styles['e-exchange-list-item--invisible']]: invisible
      })}
    >
      <img className={styles['e-exchange-list-item__logo']} src={logoSrc} alt=""/>
      <div className={styles['e-exchange-list-item__title']}>{title}</div>
      {info && (
        <div className={styles['e-exchange-list-item__info']}>{info}</div>
      )}

      {!isLargeScreen && changeText && (
        <div className={styles['e-exchange-list-item__change-text']} onClick={onChangeClick}>
          {changeText}
        </div>
      )}
    </div>
  )
}
