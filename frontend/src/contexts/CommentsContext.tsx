import { ReactNode, createContext, useCallback, useContext } from "react";
import { CommentsState } from "@/lib/slices/comments.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import commentsService, { GetCommentsProps } from "@/services/comments.service";
import { useLazyQuery, useQuery } from "@apollo/client";
import { getCommentsQuery } from "@/api/comments/graphql/getcomments.query";

interface CommentsContextType {
  state: CommentsState;
  getComments: (props: Partial<GetCommentsProps>) => void;
}

const CommentsContext = createContext<CommentsContextType | null>(null);
export const useComments = () =>
  useContext(CommentsContext) as CommentsContextType;

interface CommentsProviderProps {
  children: ReactNode;
}

export default function CommentsProvider({ children }: CommentsProviderProps) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((reducers) => reducers.comments);

  const [getCommentsFunc, resp] = useLazyQuery(getCommentsQuery);
  console.log(resp);

  const getComments = useCallback(
    (props: Partial<GetCommentsProps>) => {
      const {
        page: statePage,
        limit: stateLimit,
        orderBy: stateOrderBy,
        order: stateOrder,
      } = state.params;
      const { page, limit, orderBy, order } = props;
      getCommentsFunc({
        variables: {
          page: page || statePage,
          limit: limit || stateLimit,
          orderBy: orderBy || stateOrderBy,
          order: order || stateOrder,
        },
      });
      // dispatch(
      //   commentsService.getComments({
      //     page: page || statePage,
      //     limit: limit || stateLimit,
      //     orderBy: orderBy || stateOrderBy,
      //     order: order || stateOrder,
      //   })
      // );
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
