import { Attender, RoomEstimation, RoomType } from "@/common/types";
import { EstimateResult } from "@/components/estimateResult/EstimateResult";
import { Options } from "@/components/options/Options";
import { AttenderList } from "@/components/attenderList/AttenderList";
import { useAppContext } from "@/context/appContext";
import { useSocket } from "@/context/socketContext";
import { getServerURI } from "@/utils/getServerURI";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { CopyRoomLink } from "@/components/copyRoomLink/CopyRoomLink";
import { StartEstimation } from "@/components/startEstimation/StartEstimation";


export async function getServerSideProps({ params }: any) {
    const response = await fetch(`${getServerURI()}/room/${params.roomName}`)
    const roomData = await response.json();

    return { props: { room: roomData } }
}

type RoomProps = {
    room: RoomType;
};

const Room = ({ room }: RoomProps) => {
    const router = useRouter();
    const socket = useSocket();

    const [roomData, setRoomData] = useState<RoomType>(room);
    const [isEstimateActive, setIsEstimateActive] = useState<boolean>(false)
    const [attendersEstimation, setAttendersEstimation] = useState<RoomEstimation>();

    const roomName = router.query.roomName as string

    const { playerName, setPlayerName } = useAppContext();

    useEffect(() => {

        const roomInfoRaw = localStorage.getItem(roomName)

        if (!playerName && roomInfoRaw) {
            const roomInfo = JSON.parse(roomInfoRaw) as unknown as Attender;
            setPlayerName(roomInfo.playerName);
            socket.emit('joinRoom', { roomName: router.query.roomName, playerName: playerName, isAdmin: roomInfo.isAdmin });
            setRoomData({ ...roomData, attenders: [...roomData.attenders, { playerName: roomInfo.playerName, isAdmin: roomInfo.isAdmin }] })

        }
        else if (!playerName && !roomInfoRaw) {
            const newPlayerName = prompt('Please enter your name');
            setPlayerName(newPlayerName!);

            setRoomData({ ...roomData, attenders: [...roomData.attenders, { playerName: newPlayerName!, isAdmin: false }] })

            localStorage.setItem(roomName, JSON.stringify({ roomName: roomName, playerName: newPlayerName, isAdmin: false }));

            socket.emit('joinRoom', { roomName: router.query.roomName, playerName: newPlayerName });

        } else {
            const roomInfo = JSON.parse(roomInfoRaw!) as unknown as Attender;

            socket.emit('joinRoom', { roomName: router.query.roomName, playerName: playerName, isAdmin: roomInfo.isAdmin });
        }

        socket.on('newAttenders', async (roomInfo: RoomType) => {
            setRoomData(roomInfo);
        })


        socket.on('showSize', (data) => {
            setAttendersEstimation(data);
        })


        socket.on('changeRoomStatus', (roomInfo: RoomType) => {
            setRoomData(roomInfo);
        })


    }, [playerName, router.query.roomName])


    const toggleEstimate = () => {
        socket.emit('showSize', { roomName: roomName, resetEstimation: !isEstimateActive }, (size: any) => {
            if (isEstimateActive) {
                startEstimation();
            }

            setAttendersEstimation(size);
            setIsEstimateActive(!isEstimateActive)
        });
    }

    const isAdmin = () => {
        const attender = roomData.attenders.find(q => q.playerName === playerName);
        return attender?.isAdmin
    }

    const startEstimation = () => {
        socket.emit('changeRoomStatus', { roomName: roomData.roomName }, (roomInfo: { room: RoomType, roomEstimations: any }) => {
            setRoomData(roomInfo.room);
            setAttendersEstimation(roomInfo.roomEstimations);
        });
    }

    const emitSelectedEstimationSize = (size: string) => {
        socket.emit('sendSelectedSize', { roomName: roomName, selectedEstimationSize: size, playerName: playerName })
    }

    return <div className="flex items-center">
        <div className="mx-auto w-full max-w-7xl py-10">
            <div className="grid md:grid-cols-2 grid-cols-1">
                <AttenderList rooms={roomData} />
                <div className='grid items-center'>
                    <CopyRoomLink roomStatus={roomData.roomStatus} />
                    <StartEstimation roomStatus={roomData.roomStatus} isAdmin={isAdmin()} onClick={startEstimation} />
                    <Options roomStatus={roomData.roomStatus} roomEstimation={attendersEstimation} cardDeck="Scrum Scale" selectedItem={emitSelectedEstimationSize} />
                    <EstimateResult roomEstimations={attendersEstimation} />

                    {(isAdmin() && roomData.roomStatus) && <button onClick={toggleEstimate} className="btn  text-white mt-5 font-bold py-2 px-4 rounded">
                        {!isEstimateActive ? `Show Result` : 'Reval Estimation'}
                    </button>}
                </div>
            </div>
        </div>
    </div>
}


export default Room