"use client";

import EventManager from "@/lib/EventManager";
import GameManager from "@/lib/Game/GameManager";
import WebSocketManager from "@/lib/WebSocketManager";
import { useEffect, useState } from "react";

export default function Game() {
  const [gameManager] = useState(new GameManager());

  const [webSocketManager] = useState(
    new WebSocketManager({
      webSocketUrl: process.env.NEXT_PUBLIC_WEBSOCKET_SERVER!,
    }),
  );

  const [eventManager] = useState(
    new EventManager(gameManager, webSocketManager),
  );

  useEffect(() => {
    eventManager.start();
    return () => {
      eventManager.stop();
    };
  }, [eventManager]);

  return <></>;
}
