import { ReactNode, createContext, useContext, useEffect } from "react";
import { UserState } from "@/lib/slices/user.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import userService from "@/services/user.service";

interface UserContextType {
  state: UserState;
}
const UserContext = createContext<UserContextType | null>(null);
export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}
export default function UserProvider({ children }: UserProviderProps) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((reducers) => reducers.user);

  useEffect(() => {
    if (!state.user && !state.error) {
      dispatch(userService.getUserInfo());
    }
  }, [dispatch, state.error, state.user]);

  return (
    <UserContext.Provider value={{ state }}>{children}</UserContext.Provider>
  );
}
