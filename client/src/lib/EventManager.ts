"use client";
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

type whoPlay = {
  type: "whoPlay";
  playerId: string;
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
      const event = JSON.parse(message) as CreatePlayer | syncBoard | whoPlay;

      if (event.type === "createPlayer") {
        this.gameManager.createPlayer(event.id, event.color, event.isMe);
      }

      if (event.type === "syncBoard") {
        this.gameManager.setCells(event.cells);
        this.gameManager.setCellsOwner(event.cellsOwner);
      }

      if (event.type === "whoPlay") {
        this.gameManager.setCurrentPlayer(event.playerId);
      }

      console.log(event);
    };

    const onOpenConnection = () => {
      setTimeout(() => {
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
      }, 3000);
    };

    this.webSocketManager.setOnMessageCallback(onMessage);
    this.webSocketManager.setOnOpenConnectionCallback(onOpenConnection);
  }

  public stop() {}
}

export default EventManager;
