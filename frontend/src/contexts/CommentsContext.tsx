import { ReactNode, createContext, useCallback, useContext } from "react";
import { CommentsState } from "@/lib/slices/comments.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import commentsService, { GetCommentsProps } from "@/services/comments.service";

interface CommentsContextType {
  state: CommentsState;
  getComments: (props: Partial<GetCommentsProps>) => void;
}

const CommentsContext = createContext<CommentsContextType | null>(null);
export const useComments = () => useContext(CommentsContext);

interface CommentsProviderProps {
  children: ReactNode;
}

export default function CommentsProvider({ children }: CommentsProviderProps) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((reducers) => reducers.comments);

  const getComments = useCallback(
    (props: Partial<GetCommentsProps>) => {
      const {
        page: statePage,
        limit: stateLimit,
        orderBy: stateOrderBy,
        order: stateOrder,
      } = state.params;
      const { page, limit, orderBy, order } = props;
      dispatch(
        commentsService.getComments({
          page: page || statePage,
          limit: limit || stateLimit,
          orderBy: orderBy || stateOrderBy,
          order: order || stateOrder,
        })
      );
    },
    [state.params, dispatch]
  );

  return (
    <CommentsContext.Provider
      value={{
        state,
        getComments,
      }}>
      {children}
    </CommentsContext.Provider>
  );
}
