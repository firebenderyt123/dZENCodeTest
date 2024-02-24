import { CommentCreated } from "@/interfaces/comment-created.interface";
import WebSocketService from "./websocket.service";

class CommentsWebSocketService extends WebSocketService {
  publishComment(commentId: number) {
    this.socket.emit("comment:publish", commentId);
  }

  onCommentPublished(callback: (comment: CommentCreated) => void) {
    this.socket.on("comment:published", callback);
  }

  offCommentPublished() {
    this.socket.off("comment:published");
  }
}
const commentsWebSocketService = new CommentsWebSocketService("/comments");
export default commentsWebSocketService;
