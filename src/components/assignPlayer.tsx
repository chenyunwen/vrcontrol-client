import { useEffect } from "react"

export const AssignPlayer = () => {
  async function getPlayer() {
    fetch(`http://140.112.49.159:8080/control/playerlist`).then((r) =>
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
