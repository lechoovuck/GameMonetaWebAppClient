import { AuthStatus } from '@/const';
import { useUserStore } from '@/store/user';

interface IUseAuthProps {
  checkStatus: AuthStatus;
}

export const useAuth = ({ checkStatus }: IUseAuthProps) => {
  const { authStatus } = useUserStore();
  return authStatus === checkStatus;
};
