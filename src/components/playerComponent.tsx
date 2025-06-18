import { useEffect, useState } from "react"

export const Main = () => {
  // const [playerData, setPlayerData] = useState<Player[]>([])
  const [webSocketData, setWebSocketData] = useState()
  useEffect(() => {
    const ws = new WebSocket("ws://140.112.49.159:8080/ws/client/player1")
    // test = room name
    ws.onopen = () => {
      console.log("open connection")
    }

    ws.onclose = () => {
      console.log("close connection")
    }

    ws.onmessage = (event) => {
      console.log(event.data)
      const data = JSON.parse(event.data)
      setWebSocketData(data)
      console.log(data)
      //   setPlayerData(data.players)
    }

    return () => {
      ws.close()
    }
  }, [])

  return <div>player1</div>
}

export default Main
