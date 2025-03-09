import { create } from "zustand";
import { persist } from "zustand/middleware";

const userStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: "user" }
  )
);

export const userId = () => userStore((state) => state.user?.id);
export const useToken = () => userStore((state) => state.user?.accessToken);

export const userActions = () => {
  const { setUser, clearUser } = userStore();
  return { setUser, clearUser };
};
