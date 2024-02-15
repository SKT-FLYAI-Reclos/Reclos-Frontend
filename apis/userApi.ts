import { user } from '@/class/user';
import appAxios from './appAxios';

type TUserResponse = {
  id: number;
  is_superuser: boolean;
  username: string;
  email: string;
  is_active: boolean;
  is_admin: boolean;
  date_joined: string;
  last_login: string;
  groups: [];
  user_permissions: [];
};

export async function getUser() {
  return await appAxios.get<TUserResponse>(`/api/user/my`, {
    headers: {
      Authorization: `Bearer ${user.getAccessToken()}`,
    },
  });
}
