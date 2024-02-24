import { Comment, CommentCreated } from "@/interfaces/comment.interface";
import WebSocketService from "./websocket.service";

class CommentsWebSocketService extends WebSocketService {
  onCommentPublished(callback: (comment: CommentCreated) => void) {
    this.socket.on("comment:published", callback);
  }

  offCommentPublished() {
    this.socket.off("comment:published");
  }
}
const commentsWebSocketService = new CommentsWebSocketService("/comments");
export default commentsWebSocketService;
