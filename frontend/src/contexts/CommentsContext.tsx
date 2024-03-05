import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CommentsState,
  getCommentsFailed,
  getCommentsSuccess,
} from "@/lib/slices/comments.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { GetCommentsProps } from "@/services/comments.service";
import { useLazyQuery } from "@apollo/client";
import {
  GET_COMMENTS_QUERY,
  GET_COMMENTS_QUERY_NAME,
} from "@/graphql/queries/comments/get-comments.query";

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
  const [tempParams, setTempParams] = useState<GetCommentsProps | null>(null);

  const [getCommentsFunc, comments] = useLazyQuery(GET_COMMENTS_QUERY);

  const getComments = useCallback(
    (props: Partial<GetCommentsProps>) => {
      const {
        page: statePage,
        limit: stateLimit,
        orderBy: stateOrderBy,
        order: stateOrder,
      } = state.params;
      const { page, limit, orderBy, order } = props;
      const variables = {
        page: page || statePage,
        limit: limit || stateLimit,
        orderBy: orderBy || stateOrderBy,
        order: order || stateOrder,
      };
      getCommentsFunc({
        variables,
      });
      setTempParams(variables);
    },
    [getCommentsFunc, state.params]
  );

  useEffect(() => {
    if (comments.data) {
      dispatch(
        getCommentsSuccess({
          commentsData: comments.data[GET_COMMENTS_QUERY_NAME],
          params: tempParams,
        })
      );
    } else if (comments.error) {
      // dispatch(getCommentsFailed("Error"));
    }
  }, [comments.data, comments.error, dispatch, tempParams]);

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
