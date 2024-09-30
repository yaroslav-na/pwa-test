import { create } from "zustand";

type AuthState = {
  username: string;
  isLogedIn: boolean;
  logIn(username: string): void;
  logOut(): void;
};

export const useAuth = create<AuthState>((set) => ({
  username: "",
  isLogedIn: false,
  logIn(username) {
    set({ isLogedIn: true, username });
  },
  logOut() {
    set({ isLogedIn: false, username: "" });
  },
}));
