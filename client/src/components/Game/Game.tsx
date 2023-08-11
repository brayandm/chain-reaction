"use client";

import EventManager from "@/lib/EventManager";
import GameManager from "@/lib/Game/GameManager";
import WebSocketManager from "@/lib/WebSocketManager";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Game() {
  const nameRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = useCallback(() => {
    const name = nameRef.current?.value || "";
    eventManager.sendName(name);
    setIsSubmitted(true);
  }, [eventManager]);

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
          <input type="text" id="name" name="name" ref={nameRef} />
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
