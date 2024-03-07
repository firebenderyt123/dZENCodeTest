import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import commentsService from "@/services/comments.service";
import { useLazyQuery } from "@apollo/client";
import {
  GET_COMMENTS_QUERY,
  GET_COMMENTS_QUERY_NAME,
} from "@/graphql/queries/comments/get-comments.query";
import { CommentsList } from "@/graphql/queries/comments/interfaces/comments-list.interface";
import { ExtendedCommentTrees } from "@/graphql/queries/comments/interfaces/extended-comment-trees.interface";
import { GetCommentsProps } from "@/graphql/queries/comments/interfaces/get-comments-props.interface";
import { errorNotify } from "@/utils/notifications.utils";

interface CommentsContextType {
  params: GetCommentsProps;
  commentsList: ExtendedCommentTrees;
  getComments: (props: Partial<GetCommentsProps>) => void;
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

  const [getCommentsFunc, commentsResp] = useLazyQuery(GET_COMMENTS_QUERY);

  const getComments = useCallback(
    (props: Partial<GetCommentsProps>) => {
      const {
        page: statePage,
        limit: stateLimit,
        orderBy: stateOrderBy,
        order: stateOrder,
      } = params;
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
      setParams(variables);
    },
    [getCommentsFunc, params]
  );

  useEffect(() => {
    if (commentsResp.data) {
      const data: CommentsList = commentsResp.data[GET_COMMENTS_QUERY_NAME];
      const trees = commentsService.commentArraysToTree(
        data.comments,
        data.commentsLength
      );
      setCommentsList({
        comments: trees,
        totalPages: data.totalPages,
        totalComments: data.totalComments,
      });
    } else if (commentsResp.error) {
      errorNotify("Error while getting comments");
    }
  }, [commentsResp.data, commentsResp.error, params.page]);

  return (
    <CommentsContext.Provider
      value={{
        params,
        commentsList,
        getComments,
      }}>
      {children}
    </CommentsContext.Provider>
  );
}
