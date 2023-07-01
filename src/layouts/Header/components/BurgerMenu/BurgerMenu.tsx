import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './BurgerMenu.module.scss'
import { MenuItem } from '../../interfaces';

type BurgerMenuProps = {
  items: MenuItem[]
  className: string | null;
};

export function BurgerMenu(props: BurgerMenuProps) {
  const { items, className } = props;
  const [isOpened, setIsOpened] = useState(false);
  const burgerMenuClass = classNames(styles['e-burger-menu'], className, {
    [styles['e-burger-menu--is-opened']]: isOpened,
  });

  useEffect(() => {
    function closeMenu(event: HTMLElementEventMap['click']) {
      const target = event.target as HTMLElement;

      if (!target.closest('.e-burger-menu')) {
        setIsOpened(false);
      }
    }

    if (isOpened) {
      document.body.addEventListener('click', closeMenu, false);
    }

    return () => {
      if (isOpened) {
        document.body.removeEventListener('click', closeMenu, false);
      }
    }
  }, [isOpened])

  function onToggleClick(event: React.SyntheticEvent) {
    event.stopPropagation();

    setIsOpened((current) => !current);
  }

  return (
    <div className={burgerMenuClass}>
      <div className={styles['e-burger-menu__button']} onClick={onToggleClick}></div>
      <div className={styles['e-burger-menu__menu']}>
        <div className={styles['e-burger-menu__menu-body']}>
          {items.map((item: MenuItem) => (
            <div key={item.href} className={styles['e-burger-menu__menu-item']}>
              <a href={item.href} className={styles['e-burger-menu__menu-item-link']}>
                <span 
                  className={classNames(
                    styles['e-burger-menu__menu-text'], {
                      [styles['e-burger-menu__menu-text--is-active']]: item.isActive,
                    }
                  )}
                >
                  {item.label}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

BurgerMenu.defaultProps = {
  items: [],
  className: null,
};
