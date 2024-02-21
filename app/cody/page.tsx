import AppLayout from '@/components/layouts/appLayout';
import PrevBtn from '@/components/navbar/prevBtn';
import TopNavbar from '@/components/navbar/topNavbar';

export default function Cody() {
  return (
    <AppLayout tnb={<TopNavbar left={<PrevBtn />} title='코디 실험실' />} showBNB={false}>
      <div>코디 실험실</div>
    </AppLayout>
  );
}
