import { Player } from "../interfaces/websocket.interface"

const playerInfo = ({ player }: { player: Player }) => {
  return (
    <div
      className={`${player.ready_to_move ? "border-blue-400" : "border-gray-600"} rounded-lg border-2 p-2`}
    >
      {/* device_id: string;
          chapter: number;
          sequence: number;
          ready_to_move: boolean;
          left_hand_position: Vector3;
          left_hand_forward: Vector3;
          right_hand_position: Vector3;
          right_hand_forward: Vector3;
          left_hand_available: boolean;
          right_hand_available: boolean;
          head_position: Vector3;
          head_forward: Vector3; */}
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
