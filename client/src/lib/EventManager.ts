import { BlobOptions } from "buffer";
import GameManager from "./Game/GameManager";
import WebSocketManager from "./WebSocketManager";

type CreatePlayer = {
  type: "createPlayer";
  id: string;
  color: string;
  isMe: boolean;
};

type syncBoard = {
  type: "syncBoard";
  cells: number[][];
  cellsOwner: string[][];
};

class EventManager {
  private gameManager: GameManager;
  private webSocketManager: WebSocketManager;

  constructor(gameManager: GameManager, webSocketManager: WebSocketManager) {
    this.gameManager = gameManager;
    this.webSocketManager = webSocketManager;
  }

  public start() {
    const onMessage = (message: string) => {
      const event = JSON.parse(message) as CreatePlayer | syncBoard;

      if (event.type === "createPlayer") {
        this.gameManager.createPlayer(event.id, event.color, event.isMe);
      }

      if (event.type === "syncBoard") {
        this.gameManager.setCells(event.cells);
        this.gameManager.setCellsOwner(event.cellsOwner);
      }

      console.log(event);
    };

    const onOpenConnection = () => {
      this.gameManager.addElementsToDom();

      let renderStep = 0;

      setInterval(() => {
        renderStep++;
        this.gameManager.render(renderStep);
      }, 1000 / 60);

      const onClickCell = (x: number, y: number) => {
        this.webSocketManager.sendMessage(
          JSON.stringify({
            type: "clickCell",
            x: x,
            y: y,
          }),
        );
      };

      this.gameManager.setClickCellCallback(onClickCell);
    };

    this.webSocketManager.setOnMessageCallback(onMessage);
    this.webSocketManager.setOnOpenConnectionCallback(onOpenConnection);
  }

  public stop() {}
}

export default EventManager;
