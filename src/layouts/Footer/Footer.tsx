import React from 'react';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <div className={styles['e-footer']}>
      <div className={styles['e-footer__wrapper']}>
        <div className={styles['e-footer__title']}>
          © Netex24.net
        </div>

        <div className={styles['e-footer__title']}>
          Меняем с 2007 года
        </div>

        <div className={styles['e-footer__description']}>
          <span>Мультивалютный обменный сервис</span>
          <br />
          <a href="#support@netex24.net">support@netex24.net</a>
        </div>

        <div className={styles['e-footer__description']}>
          В этот же год некий Сатоши Накамото сообщил, что начал работать над концепцией новой денежной системы, названной автором как Биткоин
        </div>
      </div>
    </div>
  )
}
