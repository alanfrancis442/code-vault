import { create } from "zustand";

type Store = {
  user: userData | null;
  setUser: () => void;
};

const useUserStore = create<Store>()((set) => ({
  user: null,
  setUser: () => set((state) => ({ user: state.user })),
}));

export default useUserStore;
