import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";

class WebSocketManager {
  private webSocket: WebSocket.Server;
  connections: { [key: string]: WebSocket } = {};
  private onMessageCallback: (connectionId: string, message: string) => void;
  private onNewConnectionCallback: (connectionId: string) => void;
  private onCloseConnectionCallback: (connectionId: string) => void;

  constructor({
    port,
    onMessageCallback = () => {
      return;
    },
    onNewConnectionCallback = () => {
      return;
    },
    onCloseConnectionCallback = () => {
      return;
    },
  }: {
    port: number;
    onMessageCallback?: (connectionId: string, message: string) => void;
    onNewConnectionCallback?: (connectionId: string) => void;
    onCloseConnectionCallback?: (connectionId: string) => void;
  }) {
    this.webSocket = new WebSocket.Server({ port: port });
    this.onMessageCallback = onMessageCallback;
    this.onNewConnectionCallback = onNewConnectionCallback;
    this.onCloseConnectionCallback = onCloseConnectionCallback;

    this.webSocket.on("connection", (connection) => {
      const connectionId = uuidv4();

      console.log(`Received a new connection (ID: ` + connectionId + `)`);

      this.connections[connectionId] = connection;

      this.onNewConnectionCallback(connectionId);

      console.log(
        `Total connections open: ` + Object.keys(this.connections).length
      );

      connection.on("close", async () => {
        console.log(`Connection closed (ID: ` + connectionId + `)`);

        delete this.connections[connectionId];

        this.onCloseConnectionCallback(connectionId);

        console.log(
          `Total connections open: ` + Object.keys(this.connections).length
        );
      });

      connection.on("message", (message: string) => {
        console.log(
          `Received message from (ID: ` + connectionId + `): ` + message
        );
        this.onMessageCallback(connectionId, message);
      });
    });

    console.log(`Server running on port ${port}`);
  }

  public sendMessage(connectionId: string, message: string) {
    if (this.connections[connectionId]) {
      this.connections[connectionId].send(message);
    }
  }

  public broadcastMessage(message: string) {
    Object.keys(this.connections).forEach((connectionId) => {
      this.sendMessage(connectionId, message);
    });
  }

  public setOnMessageCallback(
    callback: (connectionId: string, message: string) => void
  ) {
    this.onMessageCallback = callback;
  }

  public setOnNewConnectionCallback(callback: (connectionId: string) => void) {
    this.onNewConnectionCallback = callback;
  }

  public setOnCloseConnectionCallback(
    callback: (connectionId: string) => void
  ) {
    this.onCloseConnectionCallback = callback;
  }
}

export default WebSocketManager;
