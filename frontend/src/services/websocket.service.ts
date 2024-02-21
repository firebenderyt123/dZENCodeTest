import io, { Socket, ManagerOptions, SocketOptions } from "socket.io-client";

class WebSocketService<T = undefined> {
  private socket: Socket;
  private uri: string;
  private options?: Partial<ManagerOptions & SocketOptions & T>;

  constructor(uri: string, opts?: Partial<ManagerOptions & SocketOptions & T>) {
    this.uri = uri;
    this.options = opts;
    this.socket = io(uri, opts);
  }

  reconnect(opts?: Partial<ManagerOptions & SocketOptions & T>) {
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
