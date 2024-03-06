import { CommentCreated } from "@/graphql/queries/comments/interfaces/comment.interface";
import WebSocketService from "../websocket.service";
import { CreateCommentProps } from "../../comments.service";
import { WS_NAMESPACE } from "../ws.enum";
import { COMMENTS_EVENTS } from "./comments.enum";
import { createFilesToSend } from "@/utils/files.utils";

class CommentsWebSocketService extends WebSocketService {
  async emitCreateComment(
    token: string,
    commentData: CreateCommentProps,
    files: File[],
    captcha: string
  ) {
    this.createTempSocket(
      async (socket) => {
        const filesToSend = await createFilesToSend(files);
        socket.emit(COMMENTS_EVENTS.CREATE_COMMENT, {
          data: commentData,
          files: filesToSend,
        });
      },
      { auth: { token, captcha } }
    );
  }

  onCommentPublished(callback: (comment: CommentCreated) => void) {
    this.socket.on(COMMENTS_EVENTS.COMMENT_PUBLISHED, callback);
  }

  offCommentPublished() {
    this.socket.off(COMMENTS_EVENTS.COMMENT_PUBLISHED);
  }

  onCommentCreateError(callback: (userId: number, message: string) => void) {
    this.socket.on(COMMENTS_EVENTS.COMMENT_CREATION_FAILED, callback);
  }

  offCommentCreateError() {
    this.socket.off(COMMENTS_EVENTS.COMMENT_CREATION_FAILED);
  }
}
const commentsWebSocketService = new CommentsWebSocketService(
  WS_NAMESPACE.COMMENTS
);
export default commentsWebSocketService;
