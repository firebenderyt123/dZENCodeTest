import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Error } from "@/interfaces/error.interface";
import { CommentsResponse } from "@/api/comments/comments-response.interface";
import { Comment } from "@/interfaces/comment.interface";
import { CommentWithParent } from "@/interfaces/comment-with-parent.interface";

export interface CommentsState {
  pending: boolean;
  data: CommentsResponse | null;
  error: Error | null;
}

const initialState: CommentsState = {
  pending: false,
  data: null,
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
    getCommentsSuccess: (state, action: PayloadAction<CommentsResponse>) => {
      state.pending = false;
      state.data = action.payload;
      state.error = null;
    },
    getCommentsFailed: (state, action: PayloadAction<Error>) => {
      state.pending = false;
      state.data = null;
      state.error = action.payload;
    },
    insertComment: (state, action: PayloadAction<CommentWithParent>) => {
      if (state.data) {
        const { parent, ...comment } = action.payload;
        const newComment = {
          ...comment,
          replies: [],
        };
        state.data.comments = parent
          ? insertCommentIntoReplies(state.data.comments, parent.id, newComment)
          : [newComment, ...state.data.comments];
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
