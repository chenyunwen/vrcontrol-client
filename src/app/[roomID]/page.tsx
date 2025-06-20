"use client"
import PlayerInfo from "@/components/player-info"
import { PlayerData, RoomInfoData } from "@/interfaces/room.interface"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SERVER } from "@/../environment"
import Button from "@/components/button"

export const RoomState = () => {
  const router = useRouter()

  const pathSegments = usePathname().split("/")

  const roomID = pathSegments.pop()
  const [playerData, setPlayerData] = useState<PlayerData[]>([])
  const [webSocketData, setWebSocketData] = useState<RoomInfoData | null>()

  useEffect(() => {
    const ws = new WebSocket(`ws://${SERVER}/ws/control/${roomID}`)
    ws.onopen = () => {
      console.log("open connection")
    }

    ws.onclose = () => {
      console.log("close connection")
    }

    ws.onmessage = (event) => {
      const data: RoomInfoData = JSON.parse(event.data)
      setWebSocketData(data)
      console.log(data)
      setPlayerData(data.players)
    }

    return () => {
      ws.close()
    }
  }, [roomID])

  return (
    <div className="w-full">
      <div>
        <Button onClick={() => router.push("/")}>&#8249; Back</Button>
      </div>
      <p className="py-3">
        Room name: <span className="font-bold">{roomID}</span>
      </p>
      <p className="font-bold">
        {webSocketData ? `Player Count: ${webSocketData.player_count}` : "No data available"}
      </p>
      <div className="flex items-center justify-start gap-2 py-3">
        <div className="font-bold">Ready to move: &nbsp;</div>
        <div className="w-8 border-b-2 border-b-blue" />
        <div>True &nbsp;</div>
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

export default RoomState
