import appAxios from './appAxios';

export function kakaoLogin(code: string, redirect_uri: string) {
  return appAxios.get<{ access: string; user: { pk: number; username: string } }>('/api/user/kakao/login', {
    params: { code, redirect_uri },
  });
}
