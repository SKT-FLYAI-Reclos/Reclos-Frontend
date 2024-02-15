import AppLayout from '@/components/layouts/appLayout';
import HomeTopNavBar from '@/components/pages/home/HomeTopNavBar';
import Banner from '@/components/pages/home/banner';
import CategoryMenu from '@/components/pages/home/cateroryMenu';
import SellBtn from '@/components/pages/home/sellBtn';

export default function Home() {
  return (
    <AppLayout>
      <HomeTopNavBar />
      <Banner />
      <CategoryMenu />
      <SellBtn />
    </AppLayout>
  );
}
