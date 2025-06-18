import { useEffect } from "react"
import { SERVER } from "@/../environment"

export const AssignPlayer = () => {
  async function getPlayer() {
    fetch(`http://${SERVER}/control/playerlist`).then((r) =>
      r.json().then((t) => {
        console.log(t)
      }),
    )
  }

  useEffect(() => {
    getPlayer()
  }, [])

  return <div>assignPlayer</div>
}

export default AssignPlayer
