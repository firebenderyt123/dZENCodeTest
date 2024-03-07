import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation } from "@apollo/client";
import {
  SIGN_UP_MUTATION,
  SIGN_UP_MUTATION_NAME,
} from "@/graphql/queries/auth/sign-up.mutation";
import {
  SIGN_IN_MUTATION,
  SIGN_IN_MUTATION_NAME,
} from "@/graphql/queries/auth/sign-in.mutation";
import cookiesService from "@/services/cookies.service";
import { Auth } from "@/graphql/queries/auth/interfaces/auth.interface";
import { SignUpResponse } from "@/graphql/queries/auth/interfaces/sign-up-response.interface";
import { SignInResponse } from "@/graphql/queries/auth/interfaces/sign-in-response.interface";
import { SignUpProps } from "@/graphql/queries/auth/interfaces/sign-up-props.interface";
import { SignInProps } from "@/graphql/queries/auth/interfaces/sign-in-props.interface";

interface AuthContextType {
  auth: Auth | null;
  login: (userData: SignInProps) => void;
  register: (userData: SignUpProps) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext) as AuthContextType;

interface AuthProviderProps {
  children: ReactNode;
}
export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!cookiesService.getToken()
  );
  const [auth, setAuth] = useState<Auth | null>(null);
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
    setAuth(null);
    setIsAuthenticated(false);
    loginData.reset();
    registerData.reset();
  }, [loginData, registerData]);

  const onAuth = (data: Auth) => {
    setAuth(data);
    setIsAuthenticated(true);
    cookiesService.setToken(data.accessToken);
  };

  useEffect(() => {
    if (loginData.data) {
      onAuth(loginData.data[SIGN_IN_MUTATION_NAME]);
    }
  }, [loginData.data]);

  useEffect(() => {
    if (registerData.data) {
      onAuth(registerData.data[SIGN_UP_MUTATION_NAME]);
    }
  }, [registerData.data]);

  return (
    <AuthContext.Provider
      value={{ auth, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
