"use client";

class GameManager {
  cells: Array<Array<number>> = [];
  maxCellBalls: Array<Array<number>> = [];
  cellsDom: Array<Array<HTMLElement>> = [];
  boardDom: HTMLElement | null = null;
  width = 10;
  height = 14;
  balls: Array<HTMLElement> = [];
  cellsOwner: Array<Array<string>> = [];
  playerColor: Map<string, string> = new Map();
  myPlayerId: string = "";
  playersName: Array<{ id: string; name: string }> = [];
  clickCellCallback: (x: number, y: number) => void = () => {};
  playerTurnDom: HTMLElement | null = null;
  playerNamesBoard: HTMLElement | null = null;

  public setClickCellCallback(callback: (x: number, y: number) => void) {
    this.clickCellCallback = callback;
  }

  public createPlayer(id: string, color: string, isMe: boolean) {
    this.playerColor.set(id, color);
    if (isMe) {
      this.myPlayerId = id;
    }
  }

  public setCurrentPlayer(playerId: string) {
    this.playerTurnDom!.style.backgroundColor = this.playerColor.get(
      playerId,
    ) as string;
  }

  constructor() {}

  public init() {
    this.cells = [];
    this.cellsOwner = [];
    this.maxCellBalls = [];
    this.cellsDom = [];
    this.balls = [];

    this.boardDom = document.createElement("div");
    this.boardDom.classList.add("board");

    this.playerNamesBoard = document.createElement("div");

    this.playerNamesBoard.classList.add("playerNamesBoard");

    this.boardDom.appendChild(this.playerNamesBoard);

    this.playerTurnDom = document.createElement("div");

    this.playerTurnDom.classList.add("playerTurn");

    this.boardDom.appendChild(this.playerTurnDom);

    for (let i = 0; i < this.height; i++) {
      this.cells.push([]);
      this.maxCellBalls.push([]);
      this.cellsOwner.push([]);
      this.cellsDom.push([]);

      const row = document.createElement("div");

      for (let j = 0; j < this.width; j++) {
        this.cells[i].push(0);
        this.cellsOwner[i].push("");
        this.cellsDom[i].push(document.createElement("div"));
        this.cellsDom[i][j].classList.add("cell");
        row.appendChild(this.cellsDom[i][j]);
        row.classList.add("row");

        this.cellsDom[i][j].addEventListener("click", () => {
          this.clickCellCallback(i, j);
        });

        if (i == 0 && j == 0) {
          this.maxCellBalls[i][j] = 1;
        } else if (i == 0 && j == this.width - 1) {
          this.maxCellBalls[i][j] = 1;
        } else if (i == this.height - 1 && j == 0) {
          this.maxCellBalls[i][j] = 1;
        } else if (i == this.height - 1 && j == this.width - 1) {
          this.maxCellBalls[i][j] = 1;
        } else if (
          i == 0 ||
          j == 0 ||
          i == this.height - 1 ||
          j == this.width - 1
        ) {
          this.maxCellBalls[i][j] = 2;
        } else {
          this.maxCellBalls[i][j] = 3;
        }
      }

      this.boardDom.appendChild(row);
    }
  }

  public addElementsToDom() {
    document.body.appendChild(this.boardDom!);
  }

  public setPlayersName(names: Array<{ id: string; name: string }>) {
    this.playersName = names;
    console.log(this.playersName);
  }

  public render(renderStep: number) {
    this.playerNamesBoard!.innerHTML = "";

    this.playersName.forEach((player) => {
      const playerDom = document.createElement("div");
      playerDom.classList.add("playerName");
      console.log(this.playerColor.get(player.id));
      console.log(this.playerColor);
      playerDom.style.backgroundColor = this.playerColor.get(player.id) || "";
      playerDom.innerHTML = player.name;
      this.playerNamesBoard!.appendChild(playerDom);
    });

    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].remove();
    }

    this.balls = [];

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.cellsDom[i][j].classList.remove("cell1", "cell2", "cell3");

        if (this.cells[i][j] > 0) {
          const ball = document.createElement("div");
          ball.classList.add("ball1");
          ball.style.backgroundColor =
            this.playerColor.get(this.cellsOwner[i][j]) || "black";
          if (this.cells[i][j] >= this.maxCellBalls[i][j]) {
            ball.style.transform = `translate(${3 - (renderStep % 5)}px, 0)`;
          }
          this.cellsDom[i][j].appendChild(ball);
          this.balls.push(ball);
        }

        if (this.cells[i][j] > 1) {
          const ball = document.createElement("div");
          ball.classList.add("ball2");
          ball.style.backgroundColor =
            this.playerColor.get(this.cellsOwner[i][j]) || "black";
          if (this.cells[i][j] >= this.maxCellBalls[i][j]) {
            ball.style.transform = `translate(${
              3 - ((renderStep + 2) % 5)
            }px, 0)`;
          }
          this.cellsDom[i][j].appendChild(ball);
          this.balls.push(ball);
        }
        if (this.cells[i][j] > 2) {
          const ball = document.createElement("div");
          ball.classList.add("ball3");
          ball.style.backgroundColor =
            this.playerColor.get(this.cellsOwner[i][j]) || "black";
          if (this.cells[i][j] >= this.maxCellBalls[i][j]) {
            ball.style.transform = `translate(${
              3 - ((renderStep + 4) % 5)
            }px, 0)`;
          }
          this.cellsDom[i][j].appendChild(ball);
          this.balls.push(ball);
        }

        if (this.cells[i][j] == 1) {
          this.cellsDom[i][j].classList.add("cell1");
        }

        if (this.cells[i][j] == 2) {
          this.cellsDom[i][j].classList.add("cell2");
        }

        if (this.cells[i][j] >= 3) {
          this.cellsDom[i][j].classList.add("cell3");
        }
      }
    }
  }

  public setCells(cells: Array<Array<number>>) {
    this.cells = cells;
  }

  public setCellsOwner(cellsOwner: Array<Array<string>>) {
    this.cellsOwner = cellsOwner;
  }
}

export default GameManager;
