import * as dotenv from "dotenv";
import WebSocketManager from "./WebSocketManager";
import GameManager from "./GameManager";
import EventManager from "./EventManager";

dotenv.config();

const gameManager = new GameManager();

const webSocketManager = new WebSocketManager({
  port: Number(process.env.WEBSOCKET_PORT || "3002"),
});

const eventManager = new EventManager(gameManager, webSocketManager);

eventManager.start();
