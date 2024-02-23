import { CommentCreated } from "@/interfaces/comment-created.interface";
import WebSocketService from "./websocket.service";

class CommentsWebSocketService extends WebSocketService {
  onCommentPublished(callback: (comment: CommentCreated) => void) {
    this.socket.on("commentPublished", callback);
  }

  offCommentPublished() {
    this.socket.off("commentPublished");
  }
}
const commentsWebSocketService = new CommentsWebSocketService("/comments");
export default commentsWebSocketService;
