import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { BannerItem } from './BannerItem';

import './Banners.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { SlideData } from './types';

type BannersProps = {
  slides: SlideData[];
}
export function Banners(props: BannersProps) {
  const { slides = [] } = props;

  return (
    <div className="e-banners">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        // loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1199: {
            slidesPerView: 3,
            spaceBetween: 19,
          },
        }}
        modules={[Pagination]}
      >
        {slides.map((bannerData: SlideData, index) => (
          <SwiperSlide key={bannerData.title}>
            <BannerItem
              title={bannerData.title}
              text={bannerData.text}
              imgSrc={bannerData.imgSrc}
              index={index}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
