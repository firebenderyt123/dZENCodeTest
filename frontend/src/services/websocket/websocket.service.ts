import io, { Socket, ManagerOptions, SocketOptions } from "socket.io-client";

abstract class WebSocketService {
  private readonly wsRoot = process.env.wsRoot as string;
  private readonly defaultOpts = {
    transports: ["websocket"],
  };

  protected socket: Socket;
  protected uri: string;
  protected options?: Partial<ManagerOptions & SocketOptions>;

  constructor(uri: string) {
    this.uri = this.wsRoot + uri;
    this.options = this.defaultOpts;
    this.socket = io(this.uri, this.options);
  }

  protected onConnect(action: () => void) {
    this.socket.on("connect", action);
  }

  protected onDisconnect(action: () => void) {
    this.socket.on("disconnect", action);
  }

  protected isConnected() {
    return this.socket.connected;
  }

  protected createTempSocket(
    callback: (socket: Socket) => void,
    options?: Partial<SocketOptions>
  ) {
    const tempSocket = io(this.uri, options);
    callback(tempSocket);
  }
}
export default WebSocketService;
