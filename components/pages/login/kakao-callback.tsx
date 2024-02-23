'use client';

import { kakaoLogin } from '@/apis/loginApi';
import { user } from '@/class/user';
import AppLayout from '@/components/layouts/appLayout';
import LoadingWithBackdrop from '@/components/loading/loadingWithBackdrop';
import QUERY_KEYS from '@/constants/queryKeys';
import { KAKAO_REDIRECT_URI_DEPLOY, KAKAO_REDIRECT_URI_DEVELOPMENT } from '@/constants/redirectUri';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const code = searchParams.get('code') as string;
  useEffect(() => {
    return;
    (async () => {
      try {
        // 서버에 로그인 요청
        const response = await kakaoLogin(
          code,
          process.env.NODE_ENV === 'development' ? KAKAO_REDIRECT_URI_DEVELOPMENT : KAKAO_REDIRECT_URI_DEPLOY
        );
        if (response.status === 200) {
          const {
            access,
            user: { pk, username },
          } = response.data;
          user.setAccessToken(access);
          user.id = pk;
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USER] });
          router.replace('/');
        } else {
          throw new Error();
        }
      } catch (e) {
        alert(e);
        router.replace('/login');
      }
    })();
  }, [router, code, queryClient]);
  return (
    <AppLayout showBNB={false}>
      <LoadingWithBackdrop />
    </AppLayout>
  );
}
