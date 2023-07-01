import React, { useRef, useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import styles from './LanguageSelector.module.scss';
import { LanguageSelectorItem } from '../../interfaces';

import ruFlag from './ru-flag.png';
import ukFlag from './uk-flag.png';
// import { current } from '@reduxjs/toolkit';


const flagReferences = new Map([
  ['uk', ukFlag],
  ['ru', ruFlag]
]);

type LanguageSelectorProps = {
  items: LanguageSelectorItem[];
  activeLangCode: string;
  onSelect: (item: LanguageSelectorItem) => void
};
export function LanguageSelector(props: LanguageSelectorProps) {
  const rootNodeRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { items, activeLangCode, onSelect } = props;

  const { languagesList, selectedLanguage } = useMemo(() => {
    const selectedLanguage = items.find((item) => item.code === activeLangCode);
    const languagesList = items.filter((item) => item.code !== activeLangCode);

    return {
      selectedLanguage,
      languagesList
    }
  }, [items, activeLangCode])

  useEffect(() => {
    // const current = rootNodeRef.current;

    function closeLanguageSelector() {
      setIsOpen(false);
    }

    if (isOpen) {
      document.body.addEventListener('click', closeLanguageSelector);
    }

    return () => {
      if (isOpen) {
        document.body.removeEventListener('click', closeLanguageSelector);
      }
    }
  }, [isOpen])

  function openLanguageSelector(event: React.SyntheticEvent) {
    event.stopPropagation();

    setIsOpen((value) => !value);
  }

  if (!selectedLanguage || !languagesList.length) return null;

  return (
    <div
      className={classNames(styles['e-language-selector'], {
        [styles['e-language-selector--is-open']]: isOpen,
      })}
      ref={rootNodeRef}
    >
      <span onClick={openLanguageSelector}>
        <img className={styles['e-language-selector__flag']} src={flagReferences.get(selectedLanguage.code)} alt=""/>{' '}
        <span className={styles['e-language-selector__language-code']}>
          {selectedLanguage.label}
        </span>
      </span>

      <ul className={styles['e-language-selector__language-list']}>
        {languagesList.map((language) => (
          <li
            key={language.code}
            className={styles['e-language-selector__language-list-item']}
            onClick={() => onSelect(language)}
          >
            <img
              className={styles['e-language-selector__language-item-flag']}
              src={flagReferences.get(language.code)}
              alt=""
            />{' '}
            <span className={styles['e-language-selector__language-item-code']}>
              {language.label}
            </span>
            <a className={styles['e-language-selector__language-switcher']} href={language.href} />
          </li>
        ))}
      </ul>
    </div>
  )
}

LanguageSelector.defaultProps = {
  onSelect: Function.prototype,
};
