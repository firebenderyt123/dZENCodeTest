import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
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

interface AuthContextType {
  state: SubscriptionResult;
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
  const [signUp, auth] = useMutation(SIGN_UP_MUTATION);
  const state = useSubscription(AUTH_SUBSCRIPTION, {
    onData: (data) => {
      console.log(data);
    },
  });

  const login = useCallback((userData: SignInProps) => {
    // dispatch(authService.loginUser(userData));
  }, []);

  const register = useCallback(
    (userData: SignUpProps) => {
      signUp({
        variables: userData,
      });
      // dispatch(authService.registerUser(userData));
    },
    [signUp]
  );

  const logout = useCallback(() => {
    // dispatch(authService.logout());
  }, []);

  useEffect(() => {
    signUp({
      variables: {
        username: "user3",
        email: "user3@example.com",
        password: "Qwerty123!",
      },
    });
  }, [signUp]);

  useEffect(() => {
    console.log(state);
    // if (state.data) {
    //   console.log(state.data[SIGN_UP_MUTATION_NAME]);
    // } else {
    //   console.log(state);
    // }
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
