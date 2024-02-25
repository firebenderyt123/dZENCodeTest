import { ReactNode, createContext, useCallback, useContext } from "react";
import { AuthState } from "@/lib/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import authService, { SignInProps, SignUpProps } from "@/services/auth.service";

interface AuthContextType {
  state: AuthState;
  login: (userData: SignInProps) => void;
  register: (userData: SignUpProps) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}
export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((reducers) => reducers.auth);

  const login = useCallback(
    (userData: SignInProps) => {
      dispatch(authService.loginUser(userData));
    },
    [dispatch]
  );

  const register = useCallback(
    (userData: SignUpProps) => {
      dispatch(authService.registerUser(userData));
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    dispatch(authService.logout());
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
