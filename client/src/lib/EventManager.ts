import GameManager from "./Game/GameManager";
import WebSocketManager from "./WebSocketManager";

class EventManager {
  private gameManager: GameManager;
  private webSocketManager: WebSocketManager;

  constructor(gameManager: GameManager, webSocketManager: WebSocketManager) {
    this.gameManager = gameManager;
    this.webSocketManager = webSocketManager;
  }

  public start() {
    const onMessage = (message: string) => {};

    const onOpenConnection = () => {
      this.gameManager.addElementsToDom();

      let renderStep = 0;

      setInterval(() => {
        renderStep++;
        this.gameManager.render(renderStep);
      }, 1000 / 60);
    };

    this.webSocketManager.setOnMessageCallback(onMessage);
    this.webSocketManager.setOnOpenConnectionCallback(onOpenConnection);
  }

  public stop() {}
}

export default EventManager;
