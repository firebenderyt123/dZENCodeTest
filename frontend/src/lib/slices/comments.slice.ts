import { chunk, drop, filter, flatMap } from "lodash";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CommentsResponse } from "@/api/comments/interfaces/comments-response.interface";
import { Comment } from "@/interfaces/comment.interface";
import { ErrorData } from "@/interfaces/error.interface";
import { CommentTree } from "../interfaces/comment-tree";

export interface CommentsState {
  pending: boolean;
  comments: CommentTree[] | null;
  params: Params;
  total: {
    pages: number;
    comments: number;
  };
  error: ErrorData | null;
}

const initialState: CommentsState = {
  pending: false,
  comments: null,
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
      state.comments = commentArraysToTree(data.comments, data.commentsLength);
      state.params = {
        ...params,
        page: params.page <= data.totalPages ? params.page : data.totalPages,
      };
      state.total = {
        pages: data.totalPages,
        comments: data.totalComments,
      };
      state.error = null;
    },
    getCommentsFailed: (state, action: PayloadAction<ErrorData>) => {
      state.pending = false;
      state.comments = null;
      state.error = action.payload;
    },
    insertComment: (state, action: PayloadAction<Comment>) => {
      if (state.comments) {
        const { parent, ...comment } = action.payload;
        // state.comments = parent
        //   ? insertCommentIntoReplies(state.comments, parent.id, comment)
        //   : [comment, ...state.comments.slice(0, -1)];
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

const commentArraysToTree = (
  comments: Comment[],
  commentsLength: number[]
): CommentTree[] => {
  if (commentsLength.length < 2) {
    return flatMap(comments, (comment) => ({
      replies: [],
      ...comment,
    }));
  }

  const [parentComments, replies] = chunk(comments, commentsLength[0]);
  const subTrees = commentArraysToTree(replies, drop(commentsLength));

  const tree = flatMap(parentComments, (parentComment) => ({
    replies: filter(
      subTrees,
      (comment) => comment.parent.id === parentComment.id
    ),
    ...parentComment,
  }));
  return tree;
};

// const insertCommentIntoReplies = (
//   commentTrees: Comment[],
//   parentId: number,
//   newComment: Comment
// ): Comment[] => {
//   const recursiveInsert = (comment: Comment): Comment => {
//     if (comment.id === parentId) {
//       return {
//         ...comment,
//         replies: [newComment, ...comment.replies],
//       };
//     }
//     const updatedReplies = comment.replies.map(recursiveInsert);
//     return {
//       ...comment,
//       replies: updatedReplies,
//     };
//   };

//   const newComments = [];
//   for (const commentTree of commentTrees) {
//     newComments.push(recursiveInsert(commentTree));
//   }
//   return newComments;
// };

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
