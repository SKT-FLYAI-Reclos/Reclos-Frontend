'use client';

import useUser from '@/hooks/useUser';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

// 예외 URL
const EXCEPTION_URL = ['/login', '/login/kakao-callback'];

export default function Auth({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isError } = useUser();
  console.log('user', user, isLoading, isError);

  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (isError && !EXCEPTION_URL.includes(pathname)) {
      router.replace('/login');
    }
  }, [isError, router, pathname]);

  return children;
}
