import { useEffect, useState } from "react";
import { Player, WebSocketData } from "../types/websocket";

const WebSocketComponent = () => {
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [webSocketData, setWebSocketData] = useState<WebSocketData | null>();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws/control/Test');

    ws.onopen = () => {
      console.log('open connection');
    };

    ws.onclose = () => {
      console.log('close connection');
    };

    ws.onmessage = (event) => {
      const data: WebSocketData = JSON.parse(event.data);
      setWebSocketData(data);
      console.log(data);
      setPlayerData(data.players);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      {webSocketData && <p>Player Count: {webSocketData.player_count}</p>}
      <p>Player Info:</p>
      {playerData.map((player) => {
        const { x, y, z } = player.head_position;
        return (
          <p key={player.device_id}>
            {player.device_id}: ({x}, {y}, {z})
          </p>
        );
      })}
    </div>
  );
}

export default WebSocketComponent;