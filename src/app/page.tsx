"use client"
import { useEffect, useState } from "react"
import { SERVER } from "@/../environment"

import PlayerList from "@/components/player-list"
import RoomList from "@/components/room-list"
import RoomCreate from "@/components/room-create"

export default function Home() {
  const [playerList, setPlayerList] = useState<string[]>([])
  const [roomList, setRoomList] = useState<string[]>([])
  const [countdown, setCountdown] = useState<number>(5)

  const getPlayer = async () => {
    console.log("fetching player list")
    fetch(`http://${SERVER}/control/playerlist`).then((r) =>
      r.json().then((j) => {
        setPlayerList(
          j.unassignedPlayers
            .slice()
            .sort((a: string, b: string) => a.localeCompare(b, undefined, { numeric: true })),
        )
      }),
    )
  }

  const getRoom = async () => {
    console.log("fetching room list")
    fetch(`http://${SERVER}/control/roomlist`).then((r) =>
      r.json().then((j) => {
        setRoomList(j.rooms.slice().sort((a: string, b: string) => a.localeCompare(b)))
      }),
    )
  }

  useEffect(() => {
    getPlayer()
    getRoom()

    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          getPlayer()
          getRoom()
          return 5
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="grid h-full w-full items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex w-full flex-col items-center gap-8 rounded-lg border border-white p-3 text-xs sm:text-base">
          <PlayerList
            playerList={playerList}
            roomList={roomList}
            countdown={countdown}
            refresh={getPlayer}
          />
        </div>
        <div className="flex w-full flex-col items-center gap-8 rounded-lg border border-white p-3 sm:items-start">
          <RoomCreate />
          <div className="m-1 w-full border-b border-white"></div>
          <RoomList roomList={roomList} countdown={countdown} refresh={getRoom} />
        </div>
      </main>
    </div>
  )
}
