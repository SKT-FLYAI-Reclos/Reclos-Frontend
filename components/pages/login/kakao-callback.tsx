'use client';

import { kakaoLogin } from '@/apis/loginApi';
import { user } from '@/class/user';
import AppLayout from '@/components/layouts/appLayout';
import QUERY_KEYS from '@/constants/queryKeys';
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
        const response = await kakaoLogin(code); // 서버에 로그인 요청
        if (response.status === 200) {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USER] });
          const {
            access,
            user: { pk, username },
          } = response.data;
          user.setAccessToken(access);
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
  return <AppLayout showBNB={false}>카카오 로그인 콜백 페이지</AppLayout>;
}
