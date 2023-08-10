"use client";
class WebSocketManager {
  private webSocket: WebSocket;
  private onMessageCallback: (message: string) => void;
  private onOpenConnectionCallback: () => void;
  private onCloseConnectionCallback: () => void;
  private onErrorMessageCallback: () => void;
  private bytesReceived = 0;
  private bytesSent = 0;

  constructor({
    webSocketUrl,
    onMessageCallback = () => {
      return;
    },
    onOpenConnectionCallback = () => {
      return;
    },
    onCloseConnectionCallback = () => {
      return;
    },
    onErrorMessageCallback = () => {
      return;
    },
  }: {
    webSocketUrl: string;
    onMessageCallback?: (message: string) => void;
    onOpenConnectionCallback?: () => void;
    onCloseConnectionCallback?: () => void;
    onErrorMessageCallback?: () => void;
  }) {
    this.webSocket = new WebSocket(webSocketUrl);

    this.onMessageCallback = onMessageCallback;
    this.onOpenConnectionCallback = onOpenConnectionCallback;
    this.onCloseConnectionCallback = onCloseConnectionCallback;
    this.onErrorMessageCallback = onErrorMessageCallback;

    this.webSocket.onopen = () => {
      console.log("WebSocket is connected.");

      this.onOpenConnectionCallback();
    };

    this.webSocket.onclose = () => {
      console.log("WebSocket is closed.");

      this.onCloseConnectionCallback();
    };

    this.webSocket.onerror = () => {
      console.log("WebSocket is error.");

      this.onErrorMessageCallback();
    };

    this.webSocket.onmessage = (event) => {
      this.bytesReceived += event.data.toString().length;
      this.onMessageCallback(event.data.toString());
    };
  }

  public sendMessage(message: string) {
    this.bytesSent += message.length;
    this.webSocket.send(message);
  }

  public closeConnection() {
    this.webSocket.close();
  }

  public setOnMessageCallback(callback: (message: string) => void) {
    this.onMessageCallback = callback;
  }

  public setOnOpenConnectionCallback(callback: () => void) {
    this.onOpenConnectionCallback = callback;
  }

  public setOnCloseConnectionCallback(callback: () => void) {
    this.onCloseConnectionCallback = callback;
  }

  public setOnErrorMessageCallback(callback: () => void) {
    this.onErrorMessageCallback = callback;
  }

  public displayDataFlowStatistics() {
    console.log("Data flow statistics:");
    console.log(
      `Bytes total ${this.bytesSent + this.bytesReceived} | Bytes sent: ${
        this.bytesSent
      } | Bytes received: ${this.bytesReceived}`,
    );
    console.log(
      `Kilobytes total ${
        (this.bytesSent + this.bytesReceived) / 1024
      } | Kilobytes sent: ${this.bytesSent / 1024} | Kilobytes received: ${
        this.bytesReceived / 1024
      }`,
    );
    console.log(
      `Megabytes total ${
        (this.bytesSent + this.bytesReceived) / 1024 / 1024
      } | Megabytes sent: ${
        this.bytesSent / 1024 / 1024
      } | Megabytes received: ${this.bytesReceived / 1024 / 1024}`,
    );
    console.log("\n");
  }
}

export default WebSocketManager;
