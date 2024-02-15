import KakaoCallback from '@/components/pages/login/kakao-callback';
import { Suspense } from 'react';

export default function KakaoLoginCallback() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <KakaoCallback />
    </Suspense>
  );
}
