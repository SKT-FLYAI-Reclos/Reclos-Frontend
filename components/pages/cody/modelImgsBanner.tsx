'use client';

import Image from 'next/image';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Dispatch, SetStateAction, useRef } from 'react';
import PrevIcon from '@/components/icons/prevIcon';
import NextIcon from '@/components/icons/nextIcon';

const settings: Settings = {
  dots: false,
  arrows: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 5000,
  pauseOnDotsHover: true,
};

export default function ModelImgsBanner({
  modelImgs,
  currentImgIdx,
  setCurrentImgIdx,
}: {
  modelImgs: { url: string; refId: string }[];
  currentImgIdx: number;
  setCurrentImgIdx: Dispatch<SetStateAction<number>>;
}) {
  modelImgs = modelImgs.length === 1 ? [...modelImgs, ...modelImgs] : modelImgs;
  const slickRef = useRef<Slider>(null);

  function handleShowPrev() {
    setCurrentImgIdx((prev) => prev - 1);
    slickRef.current?.slickPrev();
  }

  function handleShowNext() {
    setCurrentImgIdx((prev) => prev + 1);
    slickRef.current?.slickNext();
  }

  return (
    <Slider ref={slickRef} {...settings} className='mb-10'>
      {modelImgs.map((img, index) => (
        <div className='w-full h-400 relative' key={index}>
          <Image
            width={0}
            height={0}
            src={img.url}
            alt={'피팅 모델 사진'}
            object-fit='contain'
            // priority
            placeholder='blur'
            blurDataURL={img.url}
            sizes='1040px'
            style={{ width: '100%', height: '400px' }}
          />
          {currentImgIdx !== 0 && (
            <button
              onClick={handleShowPrev}
              className='absolute left-10 top-[calc(50%-12px)] w-24 h-24 bg-white rounded-full flex justify-center items-center'
            >
              <PrevIcon width='10' height='14' color='#D1D5DB' />
            </button>
          )}
          {currentImgIdx !== modelImgs.length - 1 && (
            <button
              onClick={handleShowNext}
              className='absolute right-10 top-[calc(50%-12px)] w-24 h-24 bg-white rounded-full flex justify-center items-center'
            >
              <NextIcon width='7' height='11' color='#D1D5DB' />
            </button>
          )}
        </div>
      ))}
    </Slider>
  );
}
