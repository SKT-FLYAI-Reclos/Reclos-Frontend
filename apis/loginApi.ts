import appAxios from './appAxios';

export function kakaoLogin(code: string) {
  return appAxios.get<{ access: string; user: { pk: number; username: string } }>('/api/user/kakao/login', {
    params: { code },
  });
}
