class GameManager {
  players: Map<string, string> = new Map();

  public createPlayer(id: string, color: string) {
    this.players.set(id, color);
  }

  public getPlayersIds() {
    return Array.from(this.players.keys());
  }

  public removePlayer(id: string) {
    this.players.delete(id);
  }
}

export default GameManager;
