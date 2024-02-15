'use client';

import Image from 'next/image';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slides = [
  {
    src: '/imgs/main_banner1.png',
    alt: '메인 배너 1',
  },
  {
    src: '/imgs/main_banner2.png',
    alt: '메인 배너 2',
  },
  {
    src: '/imgs/main_banner3.png',
    alt: '메인 배너 3',
  },
];

const mainBannerSettings: Settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnDotsHover: true,

  // beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
};

export default function Banner() {
  return (
    <Slider {...mainBannerSettings} className='mb-20'>
      {slides.map((slide, index) => (
        <div className='w-full h-295 relative' key={index}>
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            object-fit='contain'
            // priority
            placeholder='blur'
            blurDataURL={slide.src}
            sizes='1040px'
          />
        </div>
      ))}
    </Slider>
  );
}
