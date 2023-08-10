class GameManager {
  players: Map<string, string> = new Map();
  cellsOwner: Array<Array<string>> = [];
  cells: Array<Array<number>> = [];
  maxCellBalls: Array<Array<number>> = [];
  height = 14;
  width = 10;

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
  }

  public getPlayersIds() {
    return Array.from(this.players.keys());
  }

  public removePlayer(id: string) {
    this.players.delete(id);
    this.deleteBallsFromPlayer(id);
  }

  public addBall(x: number, y: number, playerId: string) {
    if (this.cells[x][y] == this.maxCellBalls[x][y]) {
      return false;
    }

    if (this.cellsOwner[x][y] != playerId && this.cellsOwner[x][y] != "") {
      return false;
    }

    this.cells[x][y]++;
    this.cellsOwner[x][y] = playerId;

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
