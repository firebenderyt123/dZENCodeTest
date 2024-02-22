import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { AuthState } from "@/lib/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import authService, { SignInProps, SignUpProps } from "@/services/auth.service";

interface AuthContextType {
  authState: AuthState;
  login: (userData: SignInProps) => void;
  register: (userData: SignUpProps) => void;
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
    dispatch(authService.logoutUser());
  }, [dispatch]);

  useEffect(() => {
    if (!authState.user) {
      dispatch(authService.getProfile());
    }
  }, [authState.user, dispatch]);

  return (
    <AuthContext.Provider value={{ authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
