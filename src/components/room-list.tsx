import { useRouter } from "next/navigation"
import Button from "./button"
import { FiRefreshCcw } from "react-icons/fi"

const RoomList = ({
  roomList,
  countdown,
  refresh,
}: {
  roomList: string[]
  countdown: number
  refresh: () => void
}) => {
  const router = useRouter()

  return (
    <div className="w-full">
      <div className="mb-2 flex w-full place-items-center justify-between py-2">
        <span className="title">Room List :</span>

        <div className="flex place-items-center">
          <span className="pr-1 text-xs text-white/50">Refreshing in {countdown} seconds</span>
          <FiRefreshCcw className="hover:cursor-pointer hover:opacity-50" onClick={refresh} />
        </div>
      </div>
      <div className="my-2 flex flex-wrap justify-start gap-4">
        {roomList.length > 0 &&
          roomList.map((room, i) => {
            return (
              <Button key={i} onClick={() => router.push("/" + room)} className="w-32">
                {room}
              </Button>
            )
          })}
      </div>
    </div>
  )
}

export default RoomList
