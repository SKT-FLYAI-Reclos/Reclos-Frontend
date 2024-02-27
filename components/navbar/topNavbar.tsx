import cls from '@/libs/cls';

export default function TopNavbar({
  left,
  title,
  right,
  showBorder = true,
  autoOpaque = false, // true일 경우 -> 최초 투명, 스크롤시 흰색
}: {
  left?: React.ReactNode;
  title?: React.ReactNode | string;
  right?: React.ReactNode;
  showBorder?: boolean;
  autoOpaque?: boolean;
}) {
  return (
    <nav
      className={cls(
        'fixed z-topnav h-64 w-full flex justify-center items-center',
        showBorder && !autoOpaque ? 'border-b-1 border-solid border-b-gray-light' : '',
        autoOpaque ? 'bg-none' : 'bg-white'
      )}
    >
      {left && <div className='absolute left-20 flex items-center'>{left}</div>}
      {typeof title === 'string' ? <div className='text-18 text-indigo-600'>{title}</div> : title}
      {right && <div className='absolute right-20 flex items-center'>{right}</div>}
    </nav>
  );
}
