import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserStore = {
  hasFinishedOnboarding: boolean;
  toggleHasOnBoarded: () => void;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      hasFinishedOnboarding: false,
      toggleHasOnBoarded: () => {
        set((state) => ({
          ...state,
          hasFinishedOnboarding: !state.hasFinishedOnboarding,
        }));
      },
    }),
    {
      name: "plantly-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
