'use client';

import Image from 'next/image';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings: Settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 5000,
  pauseOnDotsHover: true,

  appendDots: (dots: any) => (
    <div
      style={{
        width: '100%',
        position: 'absolute',
        bottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ul> {dots} </ul>
    </div>
  ),
  dotsClass: 'dots_custom',

  // beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
};

export default function Banner({ slides }: { slides: { src: string; alt: string }[] }) {
  return (
    <Slider {...settings} className='mb-10'>
      {slides.map((slide, index) => (
        <div className='w-full h-400 relative' key={index}>
          <Image
            width={0}
            height={0}
            src={slide.src}
            alt={slide.alt}
            object-fit='contain'
            // priority
            placeholder='blur'
            blurDataURL={slide.src}
            sizes='1040px'
            style={{ width: '100%', height: '400px' }}
          />
        </div>
      ))}
    </Slider>
  );
}
