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
      setPlayerData(data.players)
    }

    return () => {
      ws.close()
    }
  }, [playerData])

  return (
    <div>
      {webSocketData && <p className="font-bold">Player Count: {webSocketData.player_count}</p>}
      {/* <p>Player Info:</p> */}
      <div className="flex flex-wrap gap-4 py-1">
        {playerData
          .slice()
          .sort((a, b) => (a.sequence >= b.sequence ? 1 : -1))
          .map((player, i) => {
            return <PlayerInfo key={i} player={player} />
          })}
      </div>
      <div className="flex items-center justify-start gap-2 py-5">
        <div className="font-bold">Ready to move: &nbsp;</div>
        <div className="border-b-blue w-8 border-b-2" />
        <div>True &nbsp;</div>
        <div className="border-b-gray w-8 border-b-2" />
        <div>False</div>
      </div>
    </div>
  )
}

export default WebSocketComponent
