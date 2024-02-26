import Logo from '@/components/logo';
import Link from 'next/link';
import Search from '../../navbar/search';
import NoticeIcon from '../../navbar/notice';
import TopNavbar from '@/components/navbar/topNavbar';
import HomeLogoIcon from '@/components/icons/homeLogo';

export default function HomeTopNavBar() {
  return (
    <TopNavbar
      left={
        <Link href='/' className='flex items-center gap-10'>
          {/* <Logo className='text-24 font-bold' /> */}
          <HomeLogoIcon />
        </Link>
      }
      right={
        <div className='flex justify-center items-center gap-20'>
          <Search width='20' height='20' />
          <NoticeIcon width='20' height='21' unread />
        </div>
      }
    />
  );
}
