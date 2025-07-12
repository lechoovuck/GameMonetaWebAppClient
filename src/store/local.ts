import { AuthStatus, LOCAL_STORE_KEY_NAME } from '@/const';

export type Token = string;

export interface LocalStore {
  token: string | null;
  authStatus: AuthStatus;
  date: number;
}

const createInitialState = (): LocalStore => ({
  token: null,
  authStatus: AuthStatus.NoAuth,
  date: Date.now(),
});

export const getLocalStore = (): LocalStore => {
  const data = localStorage.getItem(LOCAL_STORE_KEY_NAME);

  if (!data) {
    return resetLocalStore();
  }

  try {
    return JSON.parse(data);
  } catch (err) {
    console.error(err);

    return createInitialState();
  }
};

export const updateLocalStore = ({
  token,
  authStatus,
}: Partial<LocalStore>) => {
  const localStore = getLocalStore();

  const data = {
    ...localStore,
    token,
    authStatus: authStatus || AuthStatus.Auth,
    date: Date.now(),
  };

  localStorage.setItem(LOCAL_STORE_KEY_NAME, JSON.stringify(data));

  return data;
};

export const resetLocalStore = () => {
  const store = createInitialState();
  localStorage.setItem(LOCAL_STORE_KEY_NAME, JSON.stringify(store));

  return store;
};
