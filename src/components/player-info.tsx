import dayjs from "dayjs"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"

import { PlayerData } from "../interfaces/room.interface"

const PlayerInfo = ({ player }: { player: PlayerData }) => {
  dayjs.extend(isSameOrBefore)

  const lastUpdateTime = dayjs(player.last_update)

  const currTime = dayjs()

  return (
    <div
      className={`${player.ready_to_move ? "border-blue" : "border-gray"} w-96 rounded-lg border-2 p-2`}
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

          <tr>
            <td>
              <strong>Last Update Time</strong>
            </td>
            <td
              className={`${lastUpdateTime.isSameOrBefore(currTime.subtract(5, "second")) && "font-bold text-red-600"}`}
            >
              {lastUpdateTime.format("YYYY/MM/DD HH:mm:ss")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PlayerInfo
