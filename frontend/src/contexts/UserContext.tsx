import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/graphql/queries/users/interfaces/user.interface";
import {
  LazyQueryExecFunction,
  OperationVariables,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import {
  GET_USER_NAME,
  GET_USER_QUERY,
} from "@/graphql/queries/users/get-user.query";
import {
  PATCH_USER_MUTATION,
  PATCH_USER_NAME,
} from "@/graphql/queries/users/patch-user.mutation";
import { GetUserResponse } from "@/graphql/queries/users/interfaces/get-user-response.interface";
import { PatchUserResponse } from "@/graphql/queries/users/interfaces/patch-user-response.interface";
import { useAuth } from "./AuthContext";
import { generateContext } from "@/graphql/utils/auth.utils";

interface UserContextType {
  user: User | null;
  getUser: LazyQueryExecFunction<GetUserResponse, OperationVariables>;
  updateUserInfo: (userData: UpdateUserData) => void;
}
const UserContext = createContext<UserContextType | null>(null);
export const useUser = () => useContext(UserContext) as UserContextType;

interface UserProviderProps {
  children: ReactNode;
}
export default function UserProvider({ children }: UserProviderProps) {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  const [getUser, userData] = useLazyQuery<GetUserResponse>(GET_USER_QUERY);
  const [patchUser, patchedUser] =
    useMutation<PatchUserResponse>(PATCH_USER_MUTATION);

  useEffect(() => {
    if (isAuthenticated) getUser({ ...generateContext() });
  }, [getUser, isAuthenticated]);

  const updateUserInfo = (data: UpdateUserData) => {
    const username =
      user?.username !== data.username?.toLowerCase()
        ? data.username
        : undefined;
    const email =
      user?.email !== data.email?.toLowerCase() ? data.email : undefined;
    const siteUrl =
      user?.siteUrl !== data.siteUrl?.toLowerCase() ? data.siteUrl : undefined;

    patchUser({ variables: { username, email, siteUrl } });
  };

  useEffect(() => {
    if (userData.data) {
      setUser(userData.data[GET_USER_NAME]);
    }
  }, [userData.data]);

  useEffect(() => {
    if (patchedUser.data) {
      setUser(patchedUser.data[PATCH_USER_NAME]);
    }
  }, [patchedUser.data]);

  return (
    <UserContext.Provider value={{ user, getUser, updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

type UpdateUserData = Partial<Omit<User, "id">>;
