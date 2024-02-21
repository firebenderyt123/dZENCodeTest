import { ReactNode, createContext, useContext, useState } from "react";
import { AuthState } from "@/lib/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import authService, { SignInProps } from "@/services/auth.service";

interface AuthContextType {
  authState: AuthState;
  login: (userData: SignInProps) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext);

interface Props {
  children: ReactNode;
}
export default function AuthProvider({ children }: Props) {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((reducers) => reducers.auth);

  const login = (userData: SignInProps) => {
    dispatch(authService.loginUser(userData));
  };

  const logout = () => {
    dispatch(authService.logoutUser());
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
