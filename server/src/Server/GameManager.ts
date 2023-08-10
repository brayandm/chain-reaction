class GameManager {
  players: Map<string, string> = new Map();
  cellsOwner: Array<Array<string>> = [];
  cells: Array<Array<number>> = [];
  maxCellBalls: Array<Array<number>> = [];
  height = 14;
  width = 10;
  currentPlayer = "";
  playerOrder: Array<string> = [];

  constructor() {
    this.cells = [];
    this.cellsOwner = [];
    this.maxCellBalls = [];

    for (let i = 0; i < this.height; i++) {
      this.cells.push([]);
      this.maxCellBalls.push([]);
      this.cellsOwner.push([]);

      for (let j = 0; j < this.width; j++) {
        this.cells[i].push(0);
        this.cellsOwner[i].push("");

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
    }
  }

  public createPlayer(id: string, color: string) {
    this.players.set(id, color);
    this.playerOrder.push(id);

    if (this.currentPlayer == "") {
      this.currentPlayer = id;
    }
  }

  public getPlayersIds() {
    return Array.from(this.players.keys());
  }

  public removePlayer(id: string) {
    this.players.delete(id);
    this.playerOrder = this.playerOrder.filter((playerId) => playerId !== id);
    this.deleteBallsFromPlayer(id);

    if (this.currentPlayer == id) {
      this.nextPlayer();
    }
  }

  public getCurrentPlayer() {
    return this.currentPlayer;
  }

  private nextPlayer() {
    if (this.playerOrder.length == 0) {
      this.currentPlayer = "";
      return;
    }

    for (let i = 0; i < this.playerOrder.length; i++) {
      if (this.playerOrder[i] == this.currentPlayer) {
        this.currentPlayer =
          this.playerOrder[(i + 1) % this.playerOrder.length];
        break;
      }
    }
  }

  public addBall(x: number, y: number, playerId: string) {
    if (this.cells[x][y] == this.maxCellBalls[x][y]) {
      return false;
    }

    if (this.cellsOwner[x][y] != playerId && this.cellsOwner[x][y] != "") {
      return false;
    }

    if (playerId !== this.currentPlayer) {
      return false;
    }

    this.cells[x][y]++;
    this.cellsOwner[x][y] = playerId;

    this.nextPlayer();

    return true;
  }

  public getCells() {
    return this.cells;
  }

  public getCellsOwner() {
    return this.cellsOwner;
  }

  private deleteBallsFromPlayer(playerId: string) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.cellsOwner[i][j] == playerId) {
          this.cells[i][j] = 0;
          this.cellsOwner[i][j] = "";
        }
      }
    }
  }
}

export default GameManager;
