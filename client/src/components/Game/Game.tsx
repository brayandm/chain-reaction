"use client";

import EventManager from "@/lib/EventManager";
import GameManager from "@/lib/Game/GameManager";
import WebSocketManager from "@/lib/WebSocketManager";
import { useEffect, useState } from "react";

export default function Game() {
  const [name, setName] = useState("");

  const [isSumitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = () => {
    eventManager.sendName(name);
    setIsSubmitted(true);
  };

  return (
    <>
      {!isSumitted && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Home</h1>
          <p>Enter your name</p>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
}
