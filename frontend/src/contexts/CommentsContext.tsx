import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import commentsService from "@/services/comments.service";
import {
  useApolloClient,
  useLazyQuery,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { GET_COMMENTS_QUERY } from "@/graphql/queries/comments/get-comments.query";
import { GetCommentsProps } from "@/graphql/queries/comments/interfaces/get-comments-props.interface";
import {
  COMMENTS_SUBSCRIPTION,
  COMMENTS_SUBSCRIPTION_NAME,
} from "@/graphql/queries/comments/comments-subscription";
import { ExtendedCommentTrees } from "@/graphql/queries/comments/interfaces/extended-comment-trees.interface";
import { errorNotify } from "@/utils/notifications.utils";
import { GetCommentsResponse } from "@/graphql/queries/comments/interfaces/get-comments-response.interface";
import { v4 as uuidv4 } from "uuid";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

const commentsUUID = uuidv4();

interface CommentsContextType {
  params: GetCommentsProps;
  commentsList: ExtendedCommentTrees;
  updateParams: (props: Partial<GetCommentsProps>) => void;
}

const CommentsContext = createContext<CommentsContextType | null>(null);
export const useComments = () =>
  useContext(CommentsContext) as CommentsContextType;

const initCommentsList: ExtendedCommentTrees = {
  comments: [],
  totalPages: 1,
  totalComments: 0,
};

const initParams: GetCommentsProps = {
  page: 1,
  limit: 25,
  orderBy: "createdAt",
  order: "DESC",
};

interface CommentsProviderProps {
  children: ReactNode;
}
export default function CommentsProvider({ children }: CommentsProviderProps) {
  const [commentsList, setCommentsList] =
    useState<ExtendedCommentTrees>(initCommentsList);
  const [params, setParams] = useState<GetCommentsProps>(initParams);

  const [firstRequest, { called, refetch, client }] = useLazyQuery(
    GET_COMMENTS_QUERY,
    {
      variables: { uuid: commentsUUID, ...params },
    }
  );
  const { data } = useSubscription<GetCommentsResponse>(COMMENTS_SUBSCRIPTION, {
    variables: { uuid: commentsUUID },
  });

  const updateParams = useCallback((props: Partial<GetCommentsProps>) => {
    setParams((prev) => ({ ...prev, ...props }));
  }, []);

  const setCommentsListData = (data: GetCommentsResponse) => {
    try {
      const response = data[COMMENTS_SUBSCRIPTION_NAME];
      const trees = commentsService.commentArraysToTree(
        response.comments,
        response.commentsLength
      );
      setCommentsList({
        comments: trees,
        totalPages: response.totalPages,
        totalComments: response.totalComments,
      });
    } catch (error) {
      errorNotify("Receiving comments failed");
    }
  };
  (client.link.right?.left as GraphQLWsLink).client.on("connected", () => {
    if (!called) firstRequest();
  });

  useEffect(() => {
    if (data) {
      setCommentsListData(data);
    }
  }, [data, params]);

  useEffect(() => {
    if (called)
      refetch({
        uuid: commentsUUID,
        ...params,
      });
  }, [called, params, refetch]);

  return (
    <CommentsContext.Provider
      value={{
        params,
        commentsList,
        updateParams,
      }}>
      {children}
    </CommentsContext.Provider>
  );
}
