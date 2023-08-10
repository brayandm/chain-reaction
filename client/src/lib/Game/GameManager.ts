class GameManager {
  cells: Array<Array<number>>;
  cellsDom: Array<Array<HTMLElement>>;
  boardDom: HTMLElement;

  constructor() {
    this.cells = [];
    this.cellsDom = [];

    this.boardDom = document.createElement("div");
    this.boardDom.id = "board";
    this.boardDom.classList.add("board");

    for (let i = 0; i < 14; i++) {
      this.cells.push([]);
      this.cellsDom.push([]);

      const row = document.createElement("div");

      for (let j = 0; j < 10; j++) {
        this.cells[i].push(0);
        this.cellsDom[i].push(document.createElement("div"));
        this.cellsDom[i][j].classList.add("cell");
        row.appendChild(this.cellsDom[i][j]);
        row.classList.add("row");
      }

      this.boardDom.appendChild(row);
    }
  }

  public addElementsToDom() {
    document.body.appendChild(this.boardDom);
  }
}

export default GameManager;
