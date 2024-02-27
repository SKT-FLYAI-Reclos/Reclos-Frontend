import AppLayout from '@/components/layouts/appLayout';
import Logo from '@/components/logo';
import TopNavbar from '@/components/navbar/topNavbar';
import ProfileFillIcon from '@/components/icons/profileFillIcon';
import ChevronRightIcon from '@/components/icons/chevronRightIcon';
import Link from 'next/link';
import WaterDropIcon from '@/components/icons/waterDropIcon';
import LevelChart from '@/components/pages/mypage/levelChart';
import TreeIcon from '@/components/icons/treeIcon';
import CreditGauge from '@/components/creditGauge';
import SettingIcon from '@/components/icons/settingIcon';
import CO2Icon from '@/components/icons/co2Icon';

export default function MyPage() {
  return (
    <AppLayout
      tnb={
        <TopNavbar left={<span className='text-16 font-medium'>My</span>} right={<SettingIcon />} showBorder={false} />
      }
    >
      <main className='px-20 pt-20'>
        <Link href={'#'} className='flex items-center justify-between bg-gray-light p-20 rounded-12 mb-20'>
          <div className='flex items-center gap-10'>
            <ProfileFillIcon width='50' height='50' />
            <div>
              <span className='block mb-2 text-16 font-medium'>보라매</span>
              <span className=' text-gray-400 text-12'>기본 정보 보기</span>
            </div>
          </div>
          <ChevronRightIcon />
        </Link>
        {/* 신뢰 레벨 */}
        <div className='flex items-center gap-5'>
          <span>신뢰 레벨</span>
          <div className='bg-indigo-600 text-white py-4 px-10 rounded-full text-12'>Lv.1</div>
        </div>
        <div className='flex justify-end mb-10'>
          <span className='text-12 text-gray-400'>Lv.2 승급까지 - 60</span>
        </div>
        <CreditGauge className='w-full h-20 mb-20' />
        <div className='flex items-center justify-between'>
          {/* 물 레벨 */}
          <div className=''>
            <WaterDropIcon width='20' height='27' />
            <LevelChart level={3} score={70} color='#2563EB' className='w-150 h-150' />
          </div>
          {/* 나무 레벨 */}
          <div>
            <CO2Icon width='35' height='23' />
            <LevelChart level={1} score={20} color='#16A34A' className='w-150 h-150' />
          </div>
        </div>

        {/* 나의 거래 */}
        <span className='block mt-[-40px] mb-20 text-16 font-medium'>나의 거래</span>
        <Link
          href={'#'}
          className='w-full py-15 mb-10 px-20 flex items-center justify-between bg-gray-light rounded-12'
        >
          <span>관심 목록</span>
          <ChevronRightIcon />
        </Link>
        <Link
          href={'#'}
          className='w-full py-15 mb-10 px-20 flex items-center justify-between bg-gray-light rounded-12'
        >
          <span>판매 내역</span>
          <ChevronRightIcon />
        </Link>
        <Link
          href={'#'}
          className='w-full mb-30 py-15 px-20 flex items-center justify-between bg-gray-light rounded-12'
        >
          <span>구매 내역</span>
          <ChevronRightIcon />
        </Link>
        {/* 고객 센터 */}
        <span className='block mb-20 text-16 font-medium'>고객 센터</span>
        <Link
          href={'#'}
          className='w-full py-15 mb-10 px-20 flex items-center justify-between bg-gray-light rounded-12'
        >
          <span>공지 사항</span>
          <ChevronRightIcon />
        </Link>
        <Link
          href={'#'}
          className='w-full py-15 mb-10 px-20 flex items-center justify-between bg-gray-light rounded-12'
        >
          <span>자주 묻는 질문</span>
          <ChevronRightIcon />
        </Link>
      </main>
    </AppLayout>
  );
}
