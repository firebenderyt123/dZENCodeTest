import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthState, authRequest, authSuccess } from "@/lib/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import authService, { SignInProps, SignUpProps } from "@/services/auth.service";
import {
  SubscriptionResult,
  useMutation,
  useSubscription,
} from "@apollo/client";
import {
  SIGN_UP_MUTATION,
  SIGN_UP_MUTATION_NAME,
} from "@/graphql/auth/sign-up.mutation";
import { AUTH_SUBSCRIPTION } from "@/graphql/auth/auth-response.subscription";
import { USER_FIELDS_FRAGMENT } from "@/graphql/fragments/user-fields.fragment";
import {
  SIGN_IN_MUTATION,
  SIGN_IN_MUTATION_NAME,
} from "@/graphql/auth/sign-in.mutation";
import cookiesService from "@/services/cookies.service";
import { AuthResponse } from "@/graphql/auth/interfaces/auth.response";
import { SignUpResponse } from "@/graphql/auth/interfaces/sign-up-response.interface";
import { SignInResponse } from "@/graphql/auth/interfaces/sign-in-response.interface";
import { errorNotify } from "@/utils/notifications.utils";

interface AuthContextType {
  state: AuthResponse | null;
  login: (userData: SignInProps) => void;
  register: (userData: SignUpProps) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}
const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext) as AuthContextType;

interface AuthProviderProps {
  children: ReactNode;
}
export default function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthResponse | null>(null);
  const [signUp, registerData] = useMutation<SignUpResponse>(SIGN_UP_MUTATION);
  const [signIn, loginData] = useMutation<SignInResponse>(SIGN_IN_MUTATION);

  const login = useCallback(
    (userData: SignInProps) => {
      signIn({
        variables: userData,
      });
    },
    [signIn]
  );

  const register = useCallback(
    (userData: SignUpProps) => {
      signUp({
        variables: userData,
      });
    },
    [signUp]
  );

  const logout = useCallback(() => {
    cookiesService.deleteToken();
  }, []);

  const isAuthenticated = useCallback(() => {
    return !!(state && state.accessToken);
  }, [state]);

  useEffect(() => {
    if (loginData.data) {
      const data = loginData.data[SIGN_IN_MUTATION_NAME];
      setState(data);
      cookiesService.setToken(data.accessToken);
    }
  }, [loginData.data]);

  useEffect(() => {
    if (registerData.data) {
      const data = registerData.data[SIGN_UP_MUTATION_NAME];
      setState(data);
      cookiesService.setToken(data.accessToken);
    }
  }, [registerData.data]);

  useEffect(() => {
    if (loginData.error) {
      if (loginData.error.graphQLErrors[0].extensions.statusCode === 401) {
        // deauth user if status is 401
      }
      errorNotify(loginData.error.message);
    }
  }, [loginData.error]);

  useEffect(() => {
    if (registerData.error) {
      // errorNotify
    }
  }, [registerData.error]);

  return (
    <AuthContext.Provider
      value={{ state, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
