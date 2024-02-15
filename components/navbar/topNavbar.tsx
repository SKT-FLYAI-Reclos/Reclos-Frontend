export default function TopNavbar({
  left,
  middle,
  right,
}: {
  left?: React.ReactNode;
  middle?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <nav className='h-64 w-full flex justify-between items-center px-16 bg-white bg-opacity-30'>
      {/* <Link href='/'>
        <Logo className='text-28 font-bold' />
      </Link>
      <div className='flex justify-center items-center gap-20'>
        <Search />
        <Notice />
      </div> */}
      {left ?? <div />}
      {middle ?? <div />}
      {right ?? <div />}
    </nav>
  );
}
