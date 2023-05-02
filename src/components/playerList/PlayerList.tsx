import { RoomType } from "@/common/types"


type PlayerListType = {
    rooms: RoomType
}

export const PlayerList = ({ rooms }: PlayerListType) => {

    return <ul className="list-none bg-white ">
        {rooms.attenders.map((item: any, index: any) => {
            return <li key={index} style={{ color: item.isAdmin ? 'green' : 'red' }} >{item.playerName} </li >
        })}
    </ul>
}

