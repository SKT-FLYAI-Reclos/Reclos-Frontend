'use client';

import Notice from '../../public/icons/notice.svg';

export default function NoticeIcon({
  unread = false,
  ...props
}: {
  unread?: boolean;
  width?: string;
  height?: string;
}) {
  return (
    <button className='relative'>
      <Notice {...props} />
      {unread && <div className='absolute top-[-3px] right-[-2px] w-6 h-6 bg-red-500 rounded-full'></div>}
    </button>
  );
}
