import React from 'react';
import styles from './NewsSection.module.scss';
import { News } from './types';

type NewsSectionProps = {
  title: string;
  moreLabel: string;
  moreHref: string;
  news: News[];
};

export function NewsSection(props: NewsSectionProps) {
  const { title, moreLabel, moreHref = '#/news', news } = props;

  return (
    <div className={styles['e-news-section']}>
      <div className={styles['e-news-section__title']}>
        {title}
      </div>

      <div>
        <a href={moreHref} className={styles['e-news-section__more-link']}>
          <span className={styles['e-news-section__more-label']}>
            {moreLabel}
          </span>
        </a>
      </div>

      <div>
        {news.map((newsItem) => (
          <div key={newsItem.title} className={styles['e-news-section__main-news-item']}>
            <div className={styles['e-news-section__main-news-item-wrap']}>
              <div className={styles['e-news-section__main-news-date']}>
                {newsItem.date}
              </div>

              <div className={styles['e-news-section__main-news-title']}>
                {newsItem.title}
              </div>

              <a className={styles['e-news-section__main-news-reference']} href={newsItem.href}></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
