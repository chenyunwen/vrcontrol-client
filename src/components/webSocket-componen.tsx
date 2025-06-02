import { useEffect, useState } from "react"
import PlayerInfo from "./playerInfo"
import { Player, WebSocketData } from "../interfaces/websocket.interface"

const WebSocketComponent = () => {
  const [playerData, setPlayerData] = useState<Player[]>([])
  const [webSocketData, setWebSocketData] = useState<WebSocketData | null>()

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ws/control/Test")

    ws.onopen = () => {
      console.log("open connection")
    }

    ws.onclose = () => {
      console.log("close connection")
    }

    ws.onmessage = (event) => {
      const data: WebSocketData = JSON.parse(event.data)
      setWebSocketData(data)
      // console.log(data);

      const tempPlayer = {
        device_id: "temp_device",
        chapter: 1,
        sequence: 1,
        ready_to_move: true,
        left_hand_position: { x: 0, y: 0, z: 0 },
        left_hand_forward: { x: 0, y: 0, z: 0 },
        right_hand_position: { x: 0, y: 0, z: 0 },
        right_hand_forward: { x: 0, y: 0, z: 0 },
        left_hand_available: true,
        right_hand_available: true,
        head_position: { x: 0, y: 5, z: 10 },
        head_forward: { x: 0, y: 0, z: 0 },
      }

      data.players.push(tempPlayer)
      setPlayerData(data.players)
    }

    return () => {
      ws.close()
    }
  }, [playerData])

  return (
    <div>
      {webSocketData && <p>Player Count: {webSocketData.player_count}</p>}
      <p>Player Info:</p>
      <div className="flex flex-wrap gap-4 py-1">
        {playerData.map((player, i) => {
          return <PlayerInfo key={i} player={player} />
        })}
      </div>
    </div>
  )
}

export default WebSocketComponent
