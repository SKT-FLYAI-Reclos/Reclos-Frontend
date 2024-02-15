import Logo from '@/components/logo';
import Link from 'next/link';
import Search from '../../navbar/search';
import Notice from '../../navbar/notice';
import TopNavbar from '@/components/navbar/topNavbar';

export default function HomeTopNavBar() {
  return (
    <TopNavbar
      left={
        <Link href='/'>
          <Logo className='text-28 font-bold' />
        </Link>
      }
      right={
        <div className='flex justify-center items-center gap-20'>
          <Search />
          <Notice />
        </div>
      }
    />
  );
}
