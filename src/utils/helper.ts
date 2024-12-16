import store, { RootState } from '../store/index.ts';

export const getToken = (): string | null => {
  const state: RootState = store.getState();
  return state.auth.token;
};
