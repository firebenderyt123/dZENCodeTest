import io, { Socket, ManagerOptions, SocketOptions } from "socket.io-client";

class WebSocketService {
  protected socket: Socket;
  protected uri: string;
  protected options?: Partial<ManagerOptions & SocketOptions>;

  constructor(uri: string, opts?: Partial<ManagerOptions & SocketOptions>) {
    this.uri = uri;
    this.options = opts;
    this.socket = io(uri, {
      transports: ["websocket"],
      ...opts,
    });
  }

  reconnect(opts?: Partial<ManagerOptions & SocketOptions>) {
    this.disconnect();
    this.options = opts;
    this.socket = io(this.uri, opts);
    this.connect();
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  onConnect(action: () => void) {
    this.socket.on("connect", action);
  }

  onDisconnect(action: () => void) {
    this.socket.on("disconnect", action);
  }
}
export default WebSocketService;
