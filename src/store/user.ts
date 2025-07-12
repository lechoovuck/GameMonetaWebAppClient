import { AuthStatus } from '@/const';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchAuthCheckSession } from '@/shared/api/fetchers/auth';
import { getLocalStore, resetLocalStore, updateLocalStore } from './local';

interface AuthorizationData {
  token: string;
  email?: string;
}

interface UserState {
  token: string | null;
  authStatus: AuthStatus;
}

interface UserAction {
  updateUserStateFromLocal: () => Promise<void>;
  authorization: (data: AuthorizationData) => void;
  logOut: () => void;
  changeAuthStatus: (status: AuthStatus) => void;
}

const initialState: UserState = {
  token: getLocalStore().token || null,
  authStatus: getLocalStore().authStatus || AuthStatus.Unknown,
};

export const useUserStore = create<UserState & UserAction>()(
  devtools(set => ({
    ...initialState,
    updateUserStateFromLocal: async () => {
      const { token, authStatus } = getLocalStore();


      if (authStatus === AuthStatus.NoAuth) {
        set({ authStatus: AuthStatus.NoAuth });
        return;
      }

      try {
        const isAuthSession = await fetchAuthCheckSession();
        if (isAuthSession) {
          set({ token, authStatus });
        } else {
          set({ authStatus: AuthStatus.NoAuth });
          resetLocalStore();
        }
      } catch {
        set({ authStatus: AuthStatus.NoAuth });
        resetLocalStore();
      }
    },

    authorization: ({ token }) =>
      set(() => {
        updateLocalStore({ token });
        return { token, authStatus: AuthStatus.Auth };
      }),

    logOut: () => {
      set(() => {
        updateLocalStore({
          token: null,
          authStatus: AuthStatus.NoAuth,
        });
        return {
          ...initialState,
          authStatus: AuthStatus.NoAuth,
        };
      });
    },

    changeAuthStatus: status => set({ authStatus: status }),
  }))
);
