import WebSocketService from "./websocket.service";
import cookiesService from "./cookies.service";

class AuthWebSocketService extends WebSocketService {
  private token: string;

  constructor(path: string) {
    super(path);
    this.token = "";
  }

  isAuthenticated(action: (state: boolean) => void) {
    this.token = cookiesService.getToken();
    this.socket.emitWithAck("isAuthenticated", this.token).then(action);
  }
}
const authWebSocketService = new AuthWebSocketService("/auth");
export default authWebSocketService;
