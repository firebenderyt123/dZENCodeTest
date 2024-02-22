import io, { Socket, ManagerOptions, SocketOptions } from "socket.io-client";

class WebSocketService {
  private readonly wsRoot = process.env.wsRoot as string;

  protected socket: Socket;
  protected uri: string;
  protected options?: Partial<ManagerOptions & SocketOptions>;

  constructor(uri: string, opts?: Partial<ManagerOptions & SocketOptions>) {
    this.uri = this.wsRoot + uri;
    this.options = opts;
    this.socket = io(this.uri, {
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
