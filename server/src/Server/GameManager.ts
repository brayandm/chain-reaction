class GameManager {
  players: Map<string, string> = new Map();
  cellsOwner: Array<Array<string>> = [];
  cells: Array<Array<number>> = [];
  maxCellBalls: Array<Array<number>> = [];
  height = 14;
  width = 10;
  currentPlayer = "";
  playerOrder: Array<string> = [];

  public getPlayerOrder() {
    return this.playerOrder;
  }

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
    if (this.playerOrder.includes(this.currentPlayer)) {
      return this.currentPlayer;
    }
    return "";
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

  private reaction(
    reactions: Array<{
      x: number;
      y: number;
    }>
  ) {
    reactions.forEach((reaction) => {
      if (reaction.x > 0) {
        this.cells[reaction.x - 1][reaction.y]++;
        this.cells[reaction.x][reaction.y]--;
        this.cellsOwner[reaction.x - 1][reaction.y] =
          this.cellsOwner[reaction.x][reaction.y];
      }

      if (reaction.x < this.height - 1) {
        this.cells[reaction.x + 1][reaction.y]++;
        this.cells[reaction.x][reaction.y]--;
        this.cellsOwner[reaction.x + 1][reaction.y] =
          this.cellsOwner[reaction.x][reaction.y];
      }

      if (reaction.y > 0) {
        this.cells[reaction.x][reaction.y - 1]++;
        this.cells[reaction.x][reaction.y]--;
        this.cellsOwner[reaction.x][reaction.y - 1] =
          this.cellsOwner[reaction.x][reaction.y];
      }

      if (reaction.y < this.width - 1) {
        this.cells[reaction.x][reaction.y + 1]++;
        this.cells[reaction.x][reaction.y]--;
        this.cellsOwner[reaction.x][reaction.y + 1] =
          this.cellsOwner[reaction.x][reaction.y];
      }

      if (this.cells[reaction.x][reaction.y] == 0) {
        this.cellsOwner[reaction.x][reaction.y] = "";
      }
    });

    const reactions2: Array<{
      x: number;
      y: number;
    }> = [];

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.cells[i][j] > this.maxCellBalls[i][j]) {
          reactions2.push({
            x: i,
            y: j,
          });
        }
      }
    }

    if (reactions2.length > 0) {
      this.reaction(reactions2);
    }
  }

  public addBall(x: number, y: number, playerId: string) {
    if (this.cellsOwner[x][y] != playerId && this.cellsOwner[x][y] != "") {
      return false;
    }

    if (this.getCurrentPlayer() == "") {
      this.currentPlayer = playerId;
    }

    if (playerId !== this.getCurrentPlayer()) {
      return false;
    }

    this.cells[x][y]++;

    if (this.cells[x][y] > this.maxCellBalls[x][y]) {
      this.reaction([
        {
          x,
          y,
        },
      ]);
    }

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
