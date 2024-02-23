import { CommentWithParent } from "@/interfaces/comment-with-parent.interface";
import WebSocketService from "./websocket.service";

class CommentsWebSocketService extends WebSocketService {
  onCommentPublished(callback: (comment: CommentWithParent) => void) {
    this.socket.on("commentPublished", callback);
  }

  offCommentPublished() {
    this.socket.off("commentPublished");
  }
}
const commentsWebSocketService = new CommentsWebSocketService("/comments");
export default commentsWebSocketService;
