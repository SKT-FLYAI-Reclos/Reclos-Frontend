import AppLayout from '@/components/layouts/appLayout';
import HomeTopNavBar from '@/components/pages/home/HomeTopNavBar';
import Products from '@/components/pages/home/products';
import Banner from '@/components/pages/home/banner';
import CategoryMenu from '@/components/pages/home/cateroryMenu';
import SellBtn from '@/components/pages/home/sellBtn';
import { Suspense } from 'react';

export default function Home() {
  return (
    <AppLayout tnb={<HomeTopNavBar />}>
      <Banner />
      <CategoryMenu />
      <Suspense fallback={<div>로딩중...</div>}>
        <Products />
      </Suspense>
      <SellBtn />
    </AppLayout>
  );
}
