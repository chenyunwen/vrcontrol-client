import { useEffect, useState } from "react"
import PlayerInfo from "./playerInfo"
import { Player, WebSocketData } from "../interfaces/websocket.interface"

const WebSocketComponent = () => {
  const [playerData, setPlayerData] = useState<Player[]>([])
  const [webSocketData, setWebSocketData] = useState<WebSocketData | null>()

  useEffect(() => {
    const ws = new WebSocket("ws://140.112.49.159:8080/ws/control/test")
    // test = room name
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
  }, [])

  return (
    <div>
      <p className="font-bold">
        {webSocketData ? `Player Count: ${webSocketData.player_count}` : "No data available"}
      </p>
      <div className="flex items-center justify-start gap-2 py-3">
        <div className="font-bold">Ready to move: &nbsp;</div>
        <div className="w-8 border-b-2 border-b-blue" />
        <div >True &nbsp;</div>
        <div className="w-8 border-b-2 border-b-gray" />
        <div>False</div>
      </div>
      {/* <p>Player Info:</p> */}
      <div className="flex flex-wrap gap-4 py-1">
        {playerData
          .slice()
          .sort((a, b) => (a.sequence >= b.sequence ? 1 : -1))
          .map((player, i) => {
            return <PlayerInfo key={i} player={player} />
          })}
      </div>
    </div>
  )
}

export default WebSocketComponent
