import React, { HTMLAttributes } from 'react';

// 신용 등급 원형 차트
// className으로 width,height 전달해주어야 함

interface Props extends HTMLAttributes<HTMLDivElement> {
  level: number;
  score: number;
  color: string;
}

export default function LevelChart({ level, score, color, ...props }: Props) {
  return (
    <div className={props.className ?? ''}>
      <div
        style={{
          background: `conic-gradient(from 270deg, ${color} 0% ${score / 2}%, #f0f0f5 ${score / 2}% 50%, transparent 0`,
        }}
        className='w-full h-full rounded-full flex justify-center items-center overflow-hidden'
      >
        <div className='bg-white w-[calc(100%-20px)] h-[calc(100%-20px)] rounded-full flex flex-col items-center pt-25'>
          <div style={{ color }} className='text-24 leading-30'>
            Lv.{level}
          </div>
          <div className='text-12 text-gray-400 font-normal'>
            Lv.{level + 1} 승급까지 - {100 - score}
          </div>
        </div>
      </div>
    </div>
  );
}
