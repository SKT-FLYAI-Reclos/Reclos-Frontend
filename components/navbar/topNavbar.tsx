export default function TopNavbar({
  left,
  title,
  right,
}: {
  left?: React.ReactNode;
  title?: string;
  right?: React.ReactNode;
}) {
  return (
    <nav className='h-64 w-full flex justify-center items-center bg-white bg-opacity-30 relative'>
      {left && <div className='absolute left-16 flex items-center'>{left}</div>}
      <div className='text-20 text-blue-500'>{title}</div>
      {right && <div className='absolute right-16 flex items-center'>{right}</div>}
    </nav>
  );
}
