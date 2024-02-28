import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CommentsResponse } from "@/api/comments/comments-response.interface";
import { Comment, CommentCreated } from "@/interfaces/comment.interface";
import { ErrorData } from "@/interfaces/error.interface";

export interface CommentsState {
  pending: boolean;
  data: CommentsResponse | null;
  params: Params;
  total: {
    pages: number;
    comments: number;
  };
  error: ErrorData | null;
}

const initialState: CommentsState = {
  pending: false,
  data: null,
  params: {
    page: 1,
    limit: 25,
    orderBy: "createdAt",
    order: "DESC",
  },
  total: {
    pages: 0,
    comments: 0,
  },
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    getCommentsRequest: (state) => {
      state.pending = true;
      state.error = null;
    },
    getCommentsSuccess: (
      state,
      action: PayloadAction<CommentsWithPageParams>
    ) => {
      const data = action.payload.commentsData;
      const params = action.payload.params;
      state.pending = false;
      state.data = data;
      state.params = {
        ...params,
        page: params.page <= data.total.pages ? params.page : data.total.pages,
      };
      state.error = null;
    },
    getCommentsFailed: (state, action: PayloadAction<ErrorData>) => {
      state.pending = false;
      state.data = null;
      state.error = action.payload;
    },
    insertComment: (state, action: PayloadAction<CommentCreated>) => {
      if (state.data) {
        const { parent, ...comment } = action.payload;
        state.data.comments = parent
          ? insertCommentIntoReplies(state.data.comments, parent.id, comment)
          : [comment, ...state.data.comments.slice(0, -1)];
        state.total = {
          comments: state.total.comments + 1,
          pages: Math.ceil((state.total.comments + 1) / state.params.limit),
        };
      }
    },
  },
});

export const {
  getCommentsRequest,
  getCommentsSuccess,
  getCommentsFailed,
  insertComment,
} = commentsSlice.actions;
export default commentsSlice.reducer;

const insertCommentIntoReplies = (
  commentTrees: Comment[],
  parentId: number,
  newComment: Comment
): Comment[] => {
  const recursiveInsert = (comment: Comment): Comment => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: [newComment, ...comment.replies],
      };
    }
    const updatedReplies = comment.replies.map(recursiveInsert);
    return {
      ...comment,
      replies: updatedReplies,
    };
  };

  const newComments = [];
  for (const commentTree of commentTrees) {
    newComments.push(recursiveInsert(commentTree));
  }
  return newComments;
};

type Params = {
  page: number;
  limit: number;
  orderBy: "createdAt" | "username" | "email";
  order: "ASC" | "DESC";
};
type CommentsWithPageParams = {
  commentsData: CommentsResponse;
  params: Params;
};