export default function TopNavbar({
  left,
  title,
  right,
}: {
  left?: React.ReactNode;
  title?: React.ReactNode | string;
  right?: React.ReactNode;
}) {
  return (
    <nav className='fixed z-topnav h-64 w-full flex justify-center items-center bg-white'>
      {left && <div className='absolute left-16 flex items-center'>{left}</div>}
      {typeof title === 'string' ? <div className='text-20 text-blue-500'>{title}</div> : title}
      {right && <div className='absolute right-16 flex items-center'>{right}</div>}
    </nav>
  );
}
