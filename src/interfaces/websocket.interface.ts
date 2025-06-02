export interface Vector3 {
  x: number;
  y: number;
  z: number;
};

export interface Player {
  device_id: string;
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
  head_forward: Vector3;
}

export interface WebSocketData {
  room_id: string;
  players: Player[];
  player_count: number;
}