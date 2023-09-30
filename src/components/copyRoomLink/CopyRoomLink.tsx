import { RoomStatusType } from "@/common/types"
import CopyRoom from "./CopyRoomLink.module.css";


type CopyRoomLinkProps = {
    roomStatus: RoomStatusType
}

export const CopyRoomLink = ({ roomStatus }: CopyRoomLinkProps) => {

    if (roomStatus !== 'start') {
        return <></>
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
    }

    return <>
        <h1 className={CopyRoom.title}>Invite players to the room</h1>
        <p  className={CopyRoom.subtitle}>Send the link below to your team mates and soon they will start joining the room</p>
        <button onClick={copyToClipboard} className="btn">Copy Room Link</button>
    </>
}