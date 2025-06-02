import { Player } from "../interfaces/websocket.interface"

const playerInfo = ({ player }: { player: Player }) => {
  return (
    <div
      className={`${player.ready_to_move ? "border-blue" : "border-gray"} w-72 rounded-lg border-2 p-2`}
    >
      <table className="player-table">
        <tbody>
          <tr>
            <td>
              <strong>Device ID</strong>
            </td>
            <td>{player.device_id}</td>
          </tr>
          <tr>
            <td>
              <strong>Chapter</strong>
            </td>
            <td>{player.chapter}</td>
          </tr>
          <tr>
            <td>
              <strong>Sequence</strong>
            </td>
            <td>{player.sequence}</td>
          </tr>
          <tr>
            <td>
              <strong>Ready to Move</strong>
            </td>
            <td>{player.ready_to_move ? "True" : "False"}</td>
          </tr>
          <tr>
            <td>
              <strong>Head Position</strong>
            </td>
            <td>
              ({player.head_position.x}, {player.head_position.y}, {player.head_position.z})
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default playerInfo
