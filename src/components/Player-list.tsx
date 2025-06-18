import { useEffect, useState } from "react"
import PlayerInfo from "./playerInfo"
import { Player, WebSocketData } from "../interfaces/websocket.interface"
import {SERVER} from "@/../environment"
import { useRouter } from "next/navigation"
import Select from "./select"

const PlayerList = () => {
  const [playerList, setPlayerList] = useState<string[]>([])
  const [roomList, setRoomList] = useState<string[]>([])
  
  const router = useRouter()
  async function getPlayer() {
    console.log("getPlayer")
    fetch(`http://${SERVER}/control/playerlist`).then((r) =>
      r.json().then((t) => {
        console.log(t.unassignedPlayers)
        setPlayerList(t.unassignedPlayers)
      }),
    )
  }

  async function getRoom() {
    console.log("getPlayer")
    fetch(`http://${SERVER}/control/roomlist`).then((r) =>
      r.json().then((t) => {
        console.log(t)
        setRoomList(t.rooms)
      }),
    )
  }

  async function assignPlayer(player: string, roomId: string, seq: number) {
    console.log("assignPlayer", player, roomId, seq)
    fetch(`http://${SERVER}/control/assignroomandseq/${player}/${roomId}/${seq}`).then((r) =>
      console.log(r.status, r.statusText)
    )
  }

  useEffect(() => {
    getPlayer() 
    getRoom()
  }, [])

  return (
    <div>
      {playerList.length > 0 && (playerList.map((player, i) => {
        return <div key={i}> 
          <div> player: {player}
          </div> 
          <Select player={player} options={roomList} onClick={
            assignPlayer
          }/>
        </div>
      }))}
      {roomList.length > 0 && (roomList.map((room, i) => {
        return <button key={i} className="border bg-blue" onClick={() => 
          router.push("/" + room)}> rooom: {room} </button>
      }))}
    </div>
  )
}

export default PlayerList
