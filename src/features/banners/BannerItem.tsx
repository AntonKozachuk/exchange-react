import React from 'react';
import classNames from 'classnames';
import styles from './BannerItem.module.scss';
import { SlideData } from './types';

type BannerItemProps = SlideData & {
  index: number;
};

export function BannerItem(props: BannerItemProps) {
  const { imgSrc, title, text, index, onClick = Function.prototype } = props;

  return (
    <div className={classNames(styles['e-banner-item'], styles[`e-banner-item--index-${index}`])}>
      <div className={styles['e-banner-item__img']} style={{ backgroundImage: `url(${imgSrc})`}} />

      <div className={styles['e-banner-item__title']} dangerouslySetInnerHTML={{__html: title}} />
      <div className={styles['e-banner-item__text']} dangerouslySetInnerHTML={{__html: text}} />
    </div>
  )
}
