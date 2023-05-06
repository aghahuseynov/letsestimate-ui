import { AttenderEstimation, RoomEstimation, RoomType } from "@/common/types"


type AttenderListType = {
    rooms: RoomType,
    roomEstimation?: RoomEstimation
}

export const AttenderList = ({ rooms, roomEstimation }: AttenderListType) => {

    const checkAttenderSizeStatus = (playerName: string) => {
        const attender = roomEstimation?.attenders.find(q => q.playerName === playerName);

        return attender ? true : false
    }

    return <div className="card w-96 sm:w-56 bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="card-title">Attenders</h2>

            <ul className="list-none ">
                {rooms.attenders.map((item: any, index: any) => {
                    return <li key={index} className={`flex items-center mb-3 ${item.isAdmin ? 'text-green-500' : 'text-red-500'}`} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <h6 className="ml-2"> {item.playerName}</h6>
                        <div className="ml-2 justify-end">
                            {checkAttenderSizeStatus(item.playerName) ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            }

                        </div>
                    </li >
                })}
            </ul>
        </div>
    </div>
}

