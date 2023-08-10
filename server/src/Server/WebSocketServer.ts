import * as dotenv from "dotenv";
import WebSocketManager from "./WebSocketManager";

dotenv.config();

const webSocketManager = new WebSocketManager({
  port: Number(process.env.WEBSOCKET_PORT || "3002"),
});
