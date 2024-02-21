import TCloset from './closetType';

type TUser = {
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
  closets: TCloset[];
  level: {
    manner_level: number;
    water_level: number;
    tree_level: number;
  }[];
};

export default TUser;
