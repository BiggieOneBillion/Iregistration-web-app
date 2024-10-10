import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// type userInfoType = {
//   avatar: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   role: string;
//   id: string;
// };

export type userProp = {
  token: string;
  updateToken: (token: string) => void;
};

export type authType = {
  isAllowed: boolean;
  updateIsAllowed: (value: boolean) => void;
};

export const userStore = create(
  persist(
    (set) => ({
      token: {},
      updateToken: (token: string) => set(() => ({ token: token })),
    }),
    {
      name: "user-details", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const authStore = create(
  persist(
    (set) => ({
      isAllowed: false,
      updateIsAllowed: (value: boolean) => set(() => ({ isAllowed: value })),
    }),
    {
      name: "isAuth", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
