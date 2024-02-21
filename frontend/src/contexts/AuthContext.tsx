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
import authWebSocketService from "@/services/auth-websocket.service";

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

  const login = (userData: SignInProps) => {
    dispatch(authService.loginUser(userData));
  };

  const register = (userData: SignUpProps) => {
    dispatch(authService.registerUser(userData));
  };

  const logout = useCallback(() => {
    dispatch(authService.logoutUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(authService.getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (authState.isAuthenticated) {
      authWebSocketService.reconnect();
    }

    authWebSocketService.onDisconnect(() => {
      console.log("You was disconnected!");
      logout();
    });
  }, [authState.isAuthenticated, logout]);

  return (
    <AuthContext.Provider value={{ authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
