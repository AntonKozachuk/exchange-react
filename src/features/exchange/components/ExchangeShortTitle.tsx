import React from 'react';
import classNames from 'classnames';
import styles from './ExchangeShortTitle.module.scss';
import { useMediaQuery } from '../../../common/hooks/use-media-query';

type ExchangeShortTitleProps = {
  title: string;
  visible: boolean;
}
export function ExchangeShortTitle(props: ExchangeShortTitleProps) {
  const { title, visible } = props;

  const isLargeScreen: boolean = useMediaQuery('(min-width: 990px)');

  return (
    <div className={classNames(styles['e-exchange-short-title'], {
        [styles['e-exchange-short-title--full-size']]: isLargeScreen,
        [styles['e-exchange-short-title--visible']]: visible
      })}
    >
      {isLargeScreen && (
        <div>
          <div className={styles['e-exchange-short-title__arrow']}></div>
          <div className={classNames(styles['e-exchange-short-title__arrow'], styles['e-exchange-short-title__arrow--down'])}></div>
        </div>
      )}
      {!isLargeScreen && (
        <span dangerouslySetInnerHTML={{__html: title }} />
      )}
    </div>
  );
}
