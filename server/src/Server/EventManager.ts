import GameManager from "./GameManager";
import WebSocketManager from "./WebSocketManager";

class EventManager {
  private gameManager: GameManager;
  private webSocketManager: WebSocketManager;
  private colorsPool: string[] = ["red", "blue"];
  private playerColor: Map<string, string> = new Map();

  constructor(gameManager: GameManager, webSocketManager: WebSocketManager) {
    this.gameManager = gameManager;
    this.webSocketManager = webSocketManager;
  }

  public start() {
    const onMessage = (connectionId: string, message: string) => {
      return;
    };

    const onNewConnection = (connectionId: string) => {
      const color = this.colorsPool.pop();
      if (color) {
        this.playerColor.set(connectionId, color);
      }

      this.webSocketManager.sendMessage(
        connectionId,
        JSON.stringify({
          type: "createPlayer",
          id: connectionId,
          color: color,
          isMe: true,
        })
      );

      this.gameManager.createPlayer(connectionId, color);

      this.gameManager.getPlayersIds().forEach((playerId) => {
        if (playerId !== connectionId) {
          this.webSocketManager.sendMessage(
            playerId,
            JSON.stringify({
              type: "createPlayer",
              id: connectionId,
              color: color,
              isMe: false,
            })
          );
        }
      });

      this.gameManager.getPlayersIds().forEach((playerId) => {
        if (playerId !== connectionId) {
          this.webSocketManager.sendMessage(
            connectionId,
            JSON.stringify({
              type: "createPlayer",
              id: playerId,
              color: this.playerColor.get(playerId),
              isMe: false,
            })
          );
        }
      });
    };

    const onCloseConnection = (connectionId: string) => {
      const color = this.playerColor.get(connectionId);
      if (color) {
        this.colorsPool.push(color);
      }
      this.gameManager.removePlayer(connectionId);
    };

    this.webSocketManager.setOnMessageCallback(onMessage);
    this.webSocketManager.setOnNewConnectionCallback(onNewConnection);
    this.webSocketManager.setOnCloseConnectionCallback(onCloseConnection);
  }
}

export default EventManager;
