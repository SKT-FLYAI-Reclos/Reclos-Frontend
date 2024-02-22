'use client';

// 이미지들을 선택하는 Tool
// maxLength: 이미지를 선택할 수 있는 최대 개수
// maxCol: 이미지를 나열할 최대 열 개수
// images: 선택된 이미지들
// onChange: 이미지가 선택되었을 때 호출되는 함수

import React, { SetStateAction, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLongPress } from 'use-long-press';
import cls from '@/libs/cls';
import PhotoAddIcon from '../../public/icons/photo--add.svg';

export default function ImagesSelectTool({
  selectedImgs,
  setSelectedImgs,
  setMode,
  mode,
  maxLength,
  maxCol,
  placeHolder,
  ...props
}: {
  maxLength: number;
  maxCol: number;
  placeHolder?: React.ReactNode;
  selectedImgs: File[];
  mode: 'normal' | 'add' | 'delete';
  setMode: React.Dispatch<SetStateAction<'normal' | 'add' | 'delete'>>;
  setSelectedImgs: React.Dispatch<SetStateAction<File[]>>;
} & React.HTMLAttributes<HTMLDivElement>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const limit = maxLength - selectedImgs.length; // 선택할 수 있는 이미지 개수

  function handleClickInput() {
    if (maxLength) {
      inputRef.current?.click();
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      if (fileList.length > limit) {
        // 선택할 수 있는 이미지 개수를 초과했을 때
        alert(`최대 ${maxLength}개까지만 선택할 수 있습니다.`);
        return;
      }
      setSelectedImgs((prev) => [...prev, ...fileList]);
    }
  }

  function handleDeleteImg(imgIdx: number) {
    if (selectedImgs.length === 1) setMode('normal');
    setSelectedImgs((imgs) => imgs.filter((_, i) => i !== imgIdx));
  }

  const onLongPress = useLongPress(() => setMode('delete'), { threshold: 500 });

  useEffect(() => {
    if (mode === 'add') {
      inputRef.current?.click();
      setMode('normal');
    }
  }, [mode, setMode]);
  return (
    <div
      onClick={!selectedImgs.length ? handleClickInput : undefined}
      {...props}
      className={cls('', props.className ?? '')}
    >
      <input
        type='file'
        accept='image/*'
        multiple
        maxLength={limit}
        {...props}
        onChange={handleOnChange}
        ref={inputRef}
        className='hidden'
      />

      {!selectedImgs.length && (
        <div className='flex justify-center items-center h-full'>
          {placeHolder ?? (
            <div className='flex items-center gap-10'>
              <PhotoAddIcon />
              <span className='text-14 text-gray-500'>여기를 눌러서 이미지를 추가하세요.</span>
            </div>
          )}
        </div>
      )}
      <div
        className='h-full p-10 overflow-y-scroll'
        style={{
          display: 'grid',
          //   gridTemplateRows: `repeat(auto, 65px)`,
          gridTemplateColumns: `repeat(${maxCol}, 1fr)`,
          rowGap: '10px',
          columnGap: '10px',
          justifyItems: 'center',
        }}
      >
        {selectedImgs.map((img, i) => (
          <div
            {...onLongPress()}
            key={i}
            style={{ height: `` }}
            // style={{ height: '100vw' }}
            className={cls(
              `relative w-full h-65 flex justify-center items-center border-1 border-solid border-indigo-200 rounded-8 bg-white`
              //   `h-calc((100vh-40px-20px)/${maxCol}px-(10px*${maxCol - 1}px))`
            )}
          >
            <Image
              src={URL.createObjectURL(img)}
              alt='선택한 옷 이미지'
              width={0}
              height={0}
              fill
              objectFit='contain'
              className='w-full h-full'
            />
            {mode === 'delete' && (
              <button
                onClick={() => handleDeleteImg(i)}
                className='absolute bottom-[-5px] right-[-5px] w-15 h-15 rounded-full border-1 border-solid border-fuchsia-500 px-3 flex justify-center items-center box-border'
              >
                <div className='w-full h-2 rounded-full bg-fuchsia-500'></div>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
