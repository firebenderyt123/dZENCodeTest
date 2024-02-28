import { ReactNode, createContext, useContext, useEffect } from "react";
import { UserState } from "@/lib/slices/user.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import userService from "@/services/user.service";
import { User } from "@/interfaces/user.interface";

interface UserContextType {
  state: UserState;
  updateUserInfo: (userData: UpdateUserData) => void;
}
const UserContext = createContext<UserContextType | null>(null);
export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}
export default function UserProvider({ children }: UserProviderProps) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((reducers) => reducers.user);

  const updateUserInfo = (data: UpdateUserData) => {
    const username =
      state.user?.username !== data.username?.toLowerCase()
        ? data.username
        : undefined;
    const email =
      state.user?.email !== data.email?.toLowerCase() ? data.email : undefined;
    const siteUrl =
      state.user?.siteUrl !== data.siteUrl?.toLowerCase()
        ? data.siteUrl
        : undefined;
    dispatch(userService.changeUserInfo({ username, email, siteUrl }));
  };

  useEffect(() => {
    if (!state.user && !state.error) {
      dispatch(userService.getUserInfo());
    }
  }, [dispatch, state.error, state.user]);

  return (
    <UserContext.Provider value={{ state, updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

type UpdateUserData = Partial<Omit<User, "id">>;
