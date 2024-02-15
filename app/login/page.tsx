'use client';

import KakaoLoginBtn from '@/components/kakaoLoginBtn';
import AppLayout from '@/components/layouts/appLayout';
import Logo from '@/components/logo';
import { KAKAO_REDIRECT_URI_DEPLOY, KAKAO_REDIRECT_URI_DEVELOPMENT } from '@/constants/redirectUri';
import Script from 'next/script';

declare global {
  interface Window {
    Kakao: {
      init: (key: any) => void;
      Auth: {
        authorize: (options: { redirectUri: string }) => void;
      };
    };
  }
}

export default function Login() {
  // 카카오 로그인 띄우기
  const loginFn = () => {
    const redirectUri =
      process.env.NODE_ENV === 'development' ? KAKAO_REDIRECT_URI_DEVELOPMENT : KAKAO_REDIRECT_URI_DEPLOY;
    window.Kakao.Auth.authorize({ redirectUri });
  };
  return (
    <AppLayout showBNB={false}>
      <div className='flex flex-col justify-center items-center h-screen font-bold'>
        <Logo className='text-40' />
        <div className='font-medium mb-50'>세상에 없던 패션 플랫폼</div>
        <KakaoLoginBtn onClick={loginFn} />
      </div>
      <Script
        src='https://developers.kakao.com/sdk/js/kakao.js'
        onLoad={() => {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        }}
      />
    </AppLayout>
  );
}
