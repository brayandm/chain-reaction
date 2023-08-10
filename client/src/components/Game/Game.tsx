"use client";

import WebSocketManager from "@/lib/WebSocketManager";
import { useEffect, useState } from "react";

export default function Game() {
  const [webSocketManager] = useState(
    new WebSocketManager({
      webSocketUrl: process.env.NEXT_PUBLIC_WEBSOCKET_SERVER!,
    }),
  );

  return <></>;
}
