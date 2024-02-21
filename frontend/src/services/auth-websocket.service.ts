import WebSocketService from "./websocket.service";
import cookiesService from "./cookies.service";
import { ManagerOptions, SocketOptions } from "socket.io-client";

class AuthWebSocketService extends WebSocketService {
  constructor(path: string) {
    super("ws://localhost:8000" + path, AuthWebSocketService.getOptions());
  }

  reconnect(): void {
    super.reconnect(AuthWebSocketService.getOptions());
  }

  private static getOptions(): Partial<ManagerOptions & SocketOptions> {
    return {
      query: {
        token: cookiesService.getToken(),
      },
    };
  }
}
const authWebSocketService = new AuthWebSocketService("/auth");
export default authWebSocketService;
