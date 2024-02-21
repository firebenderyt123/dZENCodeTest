import WebSocketService from "./websocket.service";
import cookiesService from "./cookies.service";

interface Opts {
  auth: {
    token: string;
  };
}

class AuthWebSocketService extends WebSocketService<Opts> {
  constructor(initialToken: string = "") {
    super("ws://localhost:8000", {
      auth: {
        token: initialToken,
      },
    });
  }

  reconnect(): void {
    super.reconnect({
      auth: {
        token: cookiesService.getToken(),
      },
    });
  }
}
const authWebSocketService = new AuthWebSocketService();
export default authWebSocketService;
