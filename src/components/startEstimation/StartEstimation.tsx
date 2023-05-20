import { RoomStatusType } from "@/common/types";

type StartEstimationProps = {
    onClick: () => void;
    roomStatus: RoomStatusType
    isAdmin?: boolean
}

export const StartEstimation = ({ onClick, roomStatus, isAdmin }: StartEstimationProps) => {

    if (!isAdmin) {
        return <></>
    }

    if (roomStatus !== 'start') {
        return <></>
    }

    return <>
        <p className="py-6 text-center">{`You are the moderator and are in control of the estimation session. Click on your avatar icon at the top right corner to hand over moderation to other players. Press "Start" when all players has joined the room.`}</p>
        <button onClick={onClick} className="btn">Start</button>
    </>
}